import { ObjectId } from 'mongodb';

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async getReview(reviewId) {
        try {
            let objectId;
            try {
                objectId = new ObjectId(reviewId.toString());
            } catch {
                return { error: "Invalid review ID format" };
            }
            
            const review = await reviews.findOne({ _id: objectId });
            
            if (!review) {
                return { error: "Review not found" };
            }
            return review;
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e.message || "Unable to get review" };
        }
    }

    static async deleteReview(reviewId) {
        try {
            let objectId;
            try {
                objectId = new ObjectId(reviewId.toString());
            } catch {
                return { error: "Invalid review ID format" };
            }
            
            const deleteResponse = await reviews.deleteOne({ _id: objectId });
            
            if (deleteResponse.deletedCount === 0) {
                return { error: "Review not found" };
            }
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e.message || "Unable to delete review" };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            let objectId;
            try {
                objectId = new ObjectId(reviewId.toString());
            } catch {
                return { error: "Invalid review ID format" };
            }
            
            const updateResponse = await reviews.updateOne(
                { _id: objectId },
                { $set: { user: user, review: review } }
            );
            
            if (updateResponse.matchedCount === 0) {
                return { error: "Review not found" };
            }
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message || "Unable to update review" };
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: parseInt(movieId),
                user: user,
                review: review,
                createdAt: new Date()
            }
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e.message || "Unable to post review" };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const parsedMovieId = parseInt(movieId);
            if (isNaN(parsedMovieId)) {
                return { error: "Invalid movie ID format" };
            }
            const cursor = await reviews.find({ movieId: parsedMovieId });
            return await cursor.toArray();
        } catch (e) {
            console.error(`Unable to get reviews: ${e}`);
            return { error: e.message || "Unable to get reviews" };
        }
    }
}