import chalk from 'chalk'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import connectDB from './config/db.js'
import { adminAuth, verifyToken } from './middlewares/auth.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 5000
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID

const __dirname = path.resolve()

const app = express()

if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', verifyToken, orderRoutes)
app.use('/api/v1/upload', verifyToken, adminAuth, uploadRoutes)
app.get('/api/v1/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID))

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

const start = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => console.log(`🚀 ${chalk.cyanBright(`Server running in ${NODE_ENV} on port:`)} ${PORT}`))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
