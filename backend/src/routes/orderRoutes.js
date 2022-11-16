import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(auth, addOrderItems)

export default router
