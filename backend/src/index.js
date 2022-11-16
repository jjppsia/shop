import 'dotenv/config'
import chalk from 'chalk'
import express from 'express'
import logger from 'morgan'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', orderRoutes)

const start = async () => {
  try {
    await connectDB()

    app.listen(PORT, () =>
      console.log(
        `🚀 ${chalk.cyanBright(
          `Server running in ${NODE_ENV} on port:`
        )} ${PORT}`
      )
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
