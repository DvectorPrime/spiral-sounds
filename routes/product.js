import express from "express"
import { getProducts, getGenres } from "../controllers/productControllers.js"

export const productRouter = express.Router()

productRouter.get("/", getProducts)

productRouter.get("/genres", getGenres)