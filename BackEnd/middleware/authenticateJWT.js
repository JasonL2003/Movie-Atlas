import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateJWT = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; //Attach user data to request
        next(); //Continue to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export default authenticateJWT;