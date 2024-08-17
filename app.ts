import express from "express";
import router from "./routes";

const app = express();

app.use(express.json())
app.get("/ping", (req, res) => res.json({ message: "Hello from server." }))
app.use('/api/v1', router)

export default app