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
        const { username, email, password } = req.body;

        //Check if user exists already
        const existingUsername = await User.findOne({ username });
        if (existingUsername){
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail){
            return res.status(400).json({ message: "Email already exists" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save(); //If collection doesn't exist, it creates it

        res.status(201).json({ message: "User registered successfully", user: { username, email } });
    } catch (error) {
        console.error("Error during sign-up:", error)
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;

        let user;
        //Check if user exists
        if (email.includes('@')) {
            //If it's an email, search by email
            user = await User.findOne({ email });
        } else {
            //Otherwise, search by username
            user = await User.findOne({ username: email });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid username or email" });
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const payload = { //Data to be transmitted and received
            userId: user._id,  
            username: user.username,
            email: user.email
        };

        //Generate JWT Token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Sign-in successful", token });

    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;