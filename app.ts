import express from "express";
import router from "./routes";

const app = express();

app.use("/api/v1", router)
app.get("/ping", (req, res) => res.json({message: "Hello from server."}))

export default app