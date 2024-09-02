import { NextFunction, Request, Response } from "express";
import users from "../models/users";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

export const forgetPassword = async (req: Request, res: Response) => {
    const {body: {email}} = req;
    try {
        const user = await users.findOne({email})
        
        if(!user)
            return res.status(404).json({message: "User not found"})
        
        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        user.resetPasswordToken = hashedToken
        user.tokenExpiresAt = Date.now() + 10 * 60 * 1000
        // Send email with reset password link
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`
        console.log('password reset link ' + resetURL)

        await user.save()
        res.status(200).json({message: "Password reset link sent"})
    } catch (error) {
        res.status(500).json({message: 'Error resetting password', error: error })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const {token} = req.params;
    const {body: {password, confirmPassword}} = req;

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        if(password !== confirmPassword)
            return res.status(401).json({message: 'Password doesn"t match confirm password'});

        const user = await users.findOne({
            resetPasswordToken: hashedToken,
            tokenExpiresAt: {$gt: Date.now()}
        });

        if(!user)
            return res.status(400).json({message: "Invalid or expired token"})

        user.password = password
        user.resetPasswordToken = ''
        user.tokenExpiresAt = 0
        await user.save()

        res.status(200).json({message: "Password reset successful"})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const changePassword = async (req: Request, res: Response) => {
    const {body: {currentPassword, newPassword}} = req
    try {
        const user = await users.findOne({ _id: req.user.id}).select(["+password"])
        
        if(!user || !await user.matchPassword(currentPassword))
            return res.status(401).json({message: "Invalid Credentials"})

        user.password = newPassword;
        await user.save()
        res.status(200).json({message: "Password changed successfully"})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}