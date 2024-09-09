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

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const createdUser = await User.create(req.body)

        res.status(201).json(createdUser)
    } catch (error) {
        res.status(400).json({error})
    }
}