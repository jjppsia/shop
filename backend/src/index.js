import 'dotenv/config'
import chalk from 'chalk'
import express from 'express'
import connectDB from './config/db.js'
import products from './data/products.js'

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/v1/products', (req, res) => {
  res.json(products)
})

app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)

  res.json(product)
})

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
