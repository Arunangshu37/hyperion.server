import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => res.status(200).json({
	status: "Up",
	timestamp: new Date().toISOString()
}));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server running on port ", PORT));

export default app;