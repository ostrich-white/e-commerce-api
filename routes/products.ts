import { Router } from "express";
import { createProducts, deleteProducts, getAllProducts, getProducts, updateProducts } from "../controllers/products";

const products = Router()

products.get("/:id", getProducts)
products.get("/", getAllProducts)
products.post("/", createProducts)
products.put("/:id", updateProducts)
products.delete("/:id", deleteProducts)

export default products