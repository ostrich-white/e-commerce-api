import { Router } from "express";
import buildCRUD from "../utils/buildCRUD";
import products, { Products } from "../models/products";

const productsRouter: Router = buildCRUD<Products>(products);

export default productsRouter;