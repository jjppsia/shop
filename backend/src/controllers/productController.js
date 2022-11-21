import { StatusCodes } from 'http-status-codes'
import Product from '../models/productModel.js'

/**
 * @desc    Create a product
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
  const { _id: user } = req.user
  const { name, image, brand, category, description, numReviews, price, countInStock } = req.body

  try {
    const product = await Product.create({
      user,
      name: 'Sample name',
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      description: 'Sample description',
      numReviews: 0,
      price: 0,
      countInStock: 0
    })

    res.status(StatusCodes.CREATED).json(product)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

/**
 * @desc    Fetch all products
 * @route   GET /api/v1/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  const { keyword } = req.query
  console.log(keyword)

  const searchQuery = keyword ? { name: { $regex: keyword, $options: 'i' } } : {}

  try {
    const products = await Product.find({ ...searchQuery })

    if (products.length === 0) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('No products found')
    }

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
    const product = await Product.findById({ _id })

    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

/**
 * @desc    Update a product
 * @route   PATCH /api/v1/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
  const { id: _id } = req.params
  const { name, image, brand, category, description, price, countInStock } = req.body

  try {
    const product = await Product.findById({ _id })

    if (!product) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('Product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id },
      { name, image, brand, category, description, price, countInStock },
      { new: true }
    )

    res.status(StatusCodes.OK).json(updatedProduct)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

/**
 * @desc    Delete a product
 * @route   DELETE /api/v1/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res, next) => {
  const { id: _id } = req.params

  try {
    const product = await Product.findById({ _id })

    if (!product) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    await Product.deleteOne({ _id })

    res.status(StatusCodes.OK).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

/**
 * @desc    Create new review
 * @route   POST /api/v1/products/:id/reviews
 * @access  Private
 */
const createProductReview = async (req, res, next) => {
  const { _id: user, name } = req.user
  const { id: _id } = req.params
  const { rating, comment } = req.body

  try {
    const product = await Product.findById({ _id })

    if (!product) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('Product not found')
    }

    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.toString() === user.toString()
    })

    if (alreadyReviewed) {
      res.status(StatusCodes.BAD_REQUEST)
      throw new Error('Product already reviewed')
    }

    const review = {
      user,
      name,
      rating: Number(rating),
      comment
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(StatusCodes.CREATED).json({ error: 'Review added' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export { createProduct, createProductReview, getProducts, getProductById, updateProduct, deleteProduct }
