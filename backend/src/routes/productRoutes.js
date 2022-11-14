import express from 'express'
import Product from '../models/productModel.js'

const router = express.Router()

/**
 * @desc    Fetch all products
 * @route   GET /api/v1/products
 * @access  Public
 **/
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

/**
 * @desc    Fetch single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 **/
router.get('/:id', async (req, res) => {
  const { id: _id } = req.params

  try {
    const product = await Product.findById(_id)

    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router
