import express from 'express'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct
} from '../controllers/productController.js'
import { adminAuth, verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(verifyToken, adminAuth, createProduct).get(getProducts)
router.route('/:id/reviews').post(verifyToken, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .patch(verifyToken, adminAuth, updateProduct)
  .delete(verifyToken, adminAuth, deleteProduct)

export default router
