import { Router } from "express";
import { getAll, getMe } from "../controller/user";
import { authorize, protect } from "../controller/auth";

const router = Router()

router.get('/getme', protect, getMe)
router.get('/', protect, authorize('admin'), getAll)

export default router;
