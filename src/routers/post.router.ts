import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import { Post } from "../models/post.model.ts";

const postRouter = express.Router();

postRouter.post('/create', async (request: Request, response: Response) => {
    try {
        const { title, content, userId } = request.body;
        const result = await Post.create({ title, content, userId });
        return response.status(201).json({
            status: 'success',
            message: "Post created successfully!",
            result
        });

    } catch (err) {
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: 'error'
        })
    }
});

postRouter.put('/update', async (request: Request, response: Response) => {
    try {
        const { title, content, userId, id } = request.body;
        const result = await Post.findOneAndUpdate({ _id: id }, { title, content, userId });
        console.log(result);

        return response.status(201).json({
            status: 'success',
            message: "Post updated successfully!",
            result
        });

    } catch (err) {
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: 'error'
        });
    }
});

postRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                message: 'Bad data',
                status: 'error'
            });
        }
        await Post.findOneAndDelete({ _id: id });

        return response.status(204).json({
            status: 'success',
            message: "Post deleted successfully!"
        });

    } catch (err) {
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: 'error'
        })
    }
});

postRouter.get('/get-all-post-title/:userId', async (request: Request, response: Response) => {
    try {
        const userId = request.params.userId as string | '';
        if (!userId) {
            return response.status(400).json({
                message: 'Bad data',
                status: 'error'
            });
        }

        const result = await Post.find({ userId: new mongoose.Types.ObjectId(userId) }).select({title: 1, _id: 1});

        return response.status(200).json({
            status: 'success',
            result
        });

    } catch (err) {
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: 'error'
        });
    }
});

postRouter.get('/get-post-by-id/:id', async (request: Request, response: Response) => {
    try {
        const postId = request.params.id as string | '';
        if (!postId) {
            return response.status(400).json({
                message: 'Bad data',
                status: 'error'
            });
        }
        const result = await Post.find({ _id: new mongoose.Types.ObjectId(postId) });

        return response.status(200).json({
            status: 'success',
            result
        });

    } catch (err) {
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: 'error'
        })
    }
});

export default postRouter;
