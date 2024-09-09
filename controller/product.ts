import { Request, Response } from "express";
import Product from "../models/products";

export const create = async (req: Request, res: Response) => {
    try {
        const newProduct = await Product.create(req.body)

        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({error})
    }
}