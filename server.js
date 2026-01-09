import express from 'express'
import {productRouter} from "./routes/product.js"
import { getGenres } from './controllers/productControllers.js'

const PORT = 8000

const app = express()

app.use(express.static('public'))

app.use("/api/products", productRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 