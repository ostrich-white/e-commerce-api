import { Request, Response } from "express"
import User from "../models/users"

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({user})
    } catch (error) {
        res.status(404).json({error})
    }
}
