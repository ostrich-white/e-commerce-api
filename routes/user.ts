import { Router } from "express";
import { create, get, getAll, getMe, update } from "../controller/user";
import { authorize } from "../controller/auth";

const router = Router()

router.get('/getme', getMe)
router.get('/:id', get)
router.get('/', authorize('admin'), getAll)
router.post('/', authorize('admin'), create)
router.put('/:id', update)

export default router;
