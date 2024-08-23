import { Router } from "express";
import { getMe } from "../controller/user";
import { protect } from "./auth";

const router = Router()

router.use('/getme', protect, getMe)

export default router