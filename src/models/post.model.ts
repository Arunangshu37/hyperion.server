import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10
    },
    content: [{
        type: {
            type: Number,
            required: true
        },
        data: {
            type: String,
            required: true
        },
        order: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const Post = mongoose.model('Post', postSchema);
