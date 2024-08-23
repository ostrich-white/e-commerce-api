import { NextFunction, Request, Response, Router } from "express";
import users from "../models/users";
import jwt from "jsonwebtoken";

const jwtSecretKey  = process.env.JWT_SECRET_KEY || 'secretKey'
const router = Router()

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if(!token)
        return res.status(401).json({message: "No token, unauthorized access"})
    try {
        req.user = jwt.verify(token, jwtSecretKey)
        next()
    } catch (error) {
        res.status(401).json({error})
    }
}

router.post('/signup', async (req, res) => {
    try {
        const createdUser = await users.create(req.body)
        
        res.status(201).json({ message: "User created successfully", "data": createdUser })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error creating user', error: error })
    }
})

router.post('/login', async ({body: {email, password}}, res) => {
    try {
        const user = await users.findOne({email}).select(['+password'])
        
        if(!user || !(await user.matchPassword(password)))
            return res.status(400).json({message: "Invalid credentials"})
        const token = jwt.sign({id: user._id}, jwtSecretKey, {expiresIn: '1h'})
        res.status(200).json({
            message: "user logged in successfully.",
            token: token
        })
    } catch (error) {
        res.status(403).json({error})
    }
})

export default router