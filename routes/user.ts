import { Router } from "express";
import { create, get, getAll, getMe, remove, update } from "../controller/user";
import { authorize } from "../controller/auth";

const router = Router()

router.get('/getme', getMe)
router.get('/:id', get)
router.get('/', authorize('admin'), getAll)
router.post('/', authorize('admin'), create)
router.put('/:id', update)
router.delete('/:id', authorize('admin'), remove)

export default router;
