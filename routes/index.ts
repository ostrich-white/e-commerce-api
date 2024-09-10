import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user"
import productRouter from "./product";
import { protect } from "../controller/auth";

const router = Router()

router.use('/auth', authRouter)
router.use('/users', protect, userRouter)
router.use('/products', productRouter)

export default router