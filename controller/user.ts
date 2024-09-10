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

export const get = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        if(req.user.role !== 'admin' && req.user.id !== user.id) {
            return res.status(403).json({message: 'Unauthorized'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
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

export const update = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        if(req.user.role !== 'admin' && req.user.id !== user.id) {
            return res.status(403).json({message: 'Unauthorized'})
        }

        const {name, email, role } = req.body
        user.name = name || user.name
        user.email = email || user.email

        if(req.user.role === 'admin') 
            user.role = role || user.role
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const user = await User.deleteOne({id: req.params.id})

        if(!user.deletedCount)
            return res.status(400).json({message: "User not found"})

        res.json({message:"User removed"})
    } catch (error) {
        res.status(500).json({error})
    }
}
