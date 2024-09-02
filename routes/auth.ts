import { Router } from "express";
import {
    changePassword,
    forgetPassword,
    login,
    protect,
    resetPassword,
    signup,
} from "../controller/auth";

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.patch('/change-password', protect, changePassword)

export default router;
