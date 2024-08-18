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

router.post('/login', async (req, res) => {
    try {
        const {body: {email, password}} = req;
        console.log({email, password});
        
        const findUser = await users.findOne({email, password})
        
        if(!findUser)
            return res.status(400).json({message: "Invalid credentials"})
        res.status(200).json({message: findUser})
    } catch (error) {
        res.status(403).json({message: error})
    }
})

export default router