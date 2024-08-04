import { Router } from "express"
import productRoute from "./products"

const router = Router();

router.use("/products", productRoute)

export default router