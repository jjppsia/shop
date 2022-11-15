import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(auth, getUserProfile)

export default router
