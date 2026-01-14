import express from 'express'
import {productRouter} from "./routes/product.js"
import { authRouter } from './routes/auth.js'

const PORT = 8000

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use("/api/auth", authRouter)

app.use("/api/products", productRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 