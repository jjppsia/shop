import express from 'express'
import { deleteProduct, getProductById, getProducts } from '../controllers/productController.js'
import { adminAuth, verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(verifyToken, adminAuth, deleteProduct)

export default router
