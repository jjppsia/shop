import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToPaid
} from '../controllers/orderController.js'
import { adminAuth } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(adminAuth, getOrders)
router.route('/myorders').get(getUserOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').patch(updateOrderToPaid)

export default router
