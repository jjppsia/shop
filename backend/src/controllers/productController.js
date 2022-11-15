import { StatusCodes } from 'http-status-codes'
import Product from '../models/productModel.js'

/**
 * @desc    Fetch all products
 * @route   GET /api/v1/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(StatusCodes.OK).json(products)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

/**
 * @desc    Fetch single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  const { id: _id } = req.params

  try {
    const product = await Product.findById(_id)

    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export { getProducts, getProductById }
