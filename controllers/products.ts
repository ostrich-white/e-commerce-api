import products, { Products } from "../models/products";
import { create, get, getAll, remove, update } from "./factory";

export const getProducts = get<Products>(products)
export const getAllProducts = getAll<Products>(products)
export const createProducts = create<Products>(products)
export const updateProducts = update<Products>(products)
export const deleteProducts = remove<Products>(products)
