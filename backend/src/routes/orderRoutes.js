import express from 'express'
import { addOrderItems, getOrderById, getOrders, updateOrderToPaid } from '../controllers/orderController.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(getOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').patch(updateOrderToPaid)

export default router
