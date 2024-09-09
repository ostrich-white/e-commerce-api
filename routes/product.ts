import { Router } from "express";
import { authorize, protect } from "../controller/auth";
import { create } from "../controller/product";

const router = Router()

router.post('/', protect, authorize('admin'), create)

export default router