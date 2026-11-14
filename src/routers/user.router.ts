import bcrypt from "bcryptjs";
import express, { type Request, type Response } from "express";
import { User } from "../models/user.model.ts";

const userRouter = express.Router();
userRouter.post('/register', async (request: Request, response: Response) => {
    try {
        const { email, name, hashedPassword } = request.body;
        if (!name || !email || !hashedPassword) {
            return response.status(400).json({
                status: 'error',
                message: 'Bad data: missing information'
            });
        }

        await User.create({ name, email, hashedPassword });
        return response.status(200).json({
            message: 'User created successfully!',
            status: "success"
        });

    } catch (err) {
        console.error(err);
        return response.status(500).json({
            message: `Internal server error ${err}`,
            status: "error"
        });
    }
});

userRouter.post('/auth', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const userDetails = await User.findOne({ email });
        if (!userDetails || !isCorrectPassword(password, userDetails.hashedPassword)) {
            return response.status(401).json({
                status: "error",
                message: "Authentication failed: Wrong username or password"
            });
        }
        return response.status(200).json({
            status: "success",
            message: "Authentication successful."
        });
    } catch (err) {
        console.log(err);
    }
});

const isCorrectPassword = async (password: string, hashedPasswod: string) => {
    return await bcrypt.compare(password, hashedPasswod);
}

export default userRouter;