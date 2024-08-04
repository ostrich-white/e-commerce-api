import express from "express";

const app = express();

app.get("/ping", (req, res) => res.json({message: "Hello from server."}))

export default app