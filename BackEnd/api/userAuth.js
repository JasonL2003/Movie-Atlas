import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

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
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during sign-up:", error)
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;