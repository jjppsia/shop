import express from 'express'
import { addOrderItems, getOrderById, getOrders } from '../controllers/orderController.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(getOrders)
router.route('/:id').get(getOrderById)

export default router
