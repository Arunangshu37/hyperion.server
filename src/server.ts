import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import postRouter from "./routers/post.router.ts";
import userRouter from "./routers/user.router.ts";

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI).then(() => console.log("Mongo db connected"))
    .catch(err => console.log(err));

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => res.status(200).json({
    status: "Up",
    timestamp: new Date().toISOString()
}));

app.use('/api/user/', userRouter);
app.use('/api/post/', postRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server running on port ", PORT));


export default app;
