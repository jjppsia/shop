import 'dotenv/config'
import chalk from 'chalk'
import express from 'express'
import logger from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev'))
app.use('/api/v1/products', productRoutes)

const start = async () => {
  try {
    await connectDB()

    app.listen(PORT, () =>
      console.log(
        `🚀 ${chalk.cyanBright(
          `Server running in ${process.env.NODE_ENV} on port:`
        )} ${PORT}`
      )
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
