import express from "express";

const app = express();
const port = 8000

app.get("/ping", (req, res) => res.json({message: "Hello from server."}))

app.listen(port, () => console.log(`Server listening on port ${port}.`))
