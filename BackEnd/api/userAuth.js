import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET

const router = express.Router();

router.post("/signup", async (req, res) => {
    try{
        const { email, password } = req.body;

        //Check if user exists already
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save(); //If collection doesn't exist, it creates it

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during sign-up:", error)
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //Generate JWT Token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Sign-in successful", token });

    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;