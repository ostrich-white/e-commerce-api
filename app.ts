import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cookieParser())
app.get("/ping", (req, res) => res.json({ message: "Hello from server." }))
app.use('/api/v1', router)

export default app