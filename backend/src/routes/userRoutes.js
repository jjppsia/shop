import express from 'express'
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js'
import { adminAuth, auth } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/').get(auth, adminAuth, getUsers)
router.route('/profile').get(auth, getUserProfile).patch(auth, updateUserProfile)

export default router
