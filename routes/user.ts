import { Router } from "express";
import { getMe } from "../controller/user";
import { protect } from "./auth";

const router = Router()

router.use('/getMe', protect, getMe)

export default router