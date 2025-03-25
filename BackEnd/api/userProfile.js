import authenticateJWT from "../middleware/authenticateJWT.js";
import User from "../model/User.js";
import express from 'express';
const router = express.Router();

router.get("/profile", authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ email: user.email, username: user.username });
    } catch (error){
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
