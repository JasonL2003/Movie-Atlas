import app from "./server.js"
import mongodb from "mongodb"
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config();

const MongoClient = mongodb.MongoClient

//URI Before MONGODB Integration on Vercel: const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.v37my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = process.env.MONGODB_URI;  

const port = 8000;

const connectMongoClient = async () => {
    try {
        const client = await MongoClient.connect(uri, {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
        });
        console.log("MongoClient connected to MongoDB");
        return client;
    } catch (err) {
        console.error('MongoClient connection error:', err.stack);
        process.exit(1);
    }
};

const connectDB = async () => { //Specifically for mongoose
    try {
        await mongoose.connect(uri, { dbName: 'database' }); //Specify database
        console.log("Mongoose connected to MongoDB");
    } catch (error) {
        console.error("Mongoose connection error:", error);
        process.exit(1); //Exit if connection fails
    }
};

//Connect both MongoClient and Mongoose
Promise.all([connectMongoClient(), connectDB()])
    .then(([client]) => {
        ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });




