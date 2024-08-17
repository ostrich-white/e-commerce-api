import { Router } from "express";
import users, { User } from "../models/users";

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const createdUser = await users.create(req.body)
        
        res.status(201).json({ message: "User created successfully", "data": createdUser })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error creating user', error: error })
    }
})

export default router