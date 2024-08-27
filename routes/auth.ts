import { Router } from "express";
import { forgetPassword, login, resetPassword, signup } from "../controller/auth";

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)

export default router;
