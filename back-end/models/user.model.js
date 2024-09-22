
import mongoose from "mongoose";


//step-> 1:  first create schema
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
    },

    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// step-> 2: create model
const User = mongoose.model('User', userSchema);

export default User;