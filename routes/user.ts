import { Router } from "express";
import { getMe } from "../controller/user";
import { protect } from "../controller/auth";

const router = Router()

router.use('/getme', protect, getMe)

export default router