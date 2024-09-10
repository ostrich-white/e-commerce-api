import { Router } from "express";
import { create, get, getAll, getMe, update } from "../controller/user";
import { authorize, protect } from "../controller/auth";

const router = Router()

router.get('/getme', protect, getMe)
router.get('/:id', protect, get)
router.get('/', protect, authorize('admin'), getAll)
router.post('/', protect, authorize('admin'), create)
router.put('/:id', protect, update)

export default router;
