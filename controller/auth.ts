import { NextFunction, Request, Response } from "express";
import users from "../models/users";
import jwt from "jsonwebtoken";

const jwtSecretKey  = process.env.JWT_SECRET_KEY || 'secretKey'

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if(!token)
        return res.status(401).json({message: "No token, unauthorized access"})
    try {
        req.user = jwt.verify(token, jwtSecretKey)
        next()
    } catch (error) {
        res.status(401).json({error})
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const createdUser = await users.create(req.body)
        
        res.status(201).json({ message: "User created successfully", data: createdUser })
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error })
    }
}

export const login = async ({body: {email, password}}: Request, res: Response) => {
    try {
        const user = await users.findOne({email}).select(['+password'])
        
        if(!user || !(await user.matchPassword(password)))
            return res.status(400).json({message: "Invalid credentials"})
        const token = jwt.sign({id: user._id}, jwtSecretKey, {expiresIn: '1h'})
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/api/v1/users/getme');
    } catch (error) {
        res.status(403).json({error})
    }
}
