import express, { request } from "express"
import { addToCart, getAll, getCartCount, deleteItem, deleteAll } from "../controllers/cartController.js"
import { requestAuth } from "../middleware/requestAuth.js"
export const cartRouter = express.Router()


cartRouter.post("/add", requestAuth, addToCart)
cartRouter.get("/cart-count", requestAuth,getCartCount)
cartRouter.get("/", requestAuth, getAll)
cartRouter.delete("/all", requestAuth, deleteAll)
cartRouter.delete('/:itemId', requestAuth, deleteItem) 