import express from 'express'
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile
} from '../controllers/userController.js'
import { adminAuth, verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/').get(verifyToken, adminAuth, getUsers)
router.route('/profile').get(verifyToken, getUserProfile).patch(verifyToken, updateUserProfile)
router
  .route('/:id')
  .get(verifyToken, adminAuth, getUserById)
  .patch(verifyToken, adminAuth, updateUser)
  .delete(verifyToken, adminAuth, deleteUser)

export default router
