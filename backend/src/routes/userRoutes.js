import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(auth, getUserProfile)

export default router
