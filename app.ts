import express from "express";
import router from "./routes";
import appErrors from "./controllers/appErrors";

const app = express();

app.use(express.json())

app.use("/api/v1", router)
app.get("/ping", (req, res) => res.json({message: "Hello from server."}))

app.use(appErrors)

export default app