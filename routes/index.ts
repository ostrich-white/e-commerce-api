import products from "./products";

const { Router } = require("express");

const router = Router()
// Enter your routes here to bind.
router.use("/products", products)

export default router
