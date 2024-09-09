import { Router } from "express";
import { create, getAll, getMe } from "../controller/user";
import { authorize, protect } from "../controller/auth";

const router = Router()

router.get('/getme', protect, getMe)
router.get('/', protect, authorize('admin'), getAll)
router.post('/', protect, authorize('admin'), create)

export default router;
