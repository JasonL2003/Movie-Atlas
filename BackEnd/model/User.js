import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,//Email format
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema); //Defines collections name - Mongoose converts "User" to "users"

export default User;
