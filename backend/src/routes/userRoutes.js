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
import { adminAuth, auth } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/').get(auth, adminAuth, getUsers)
router.route('/profile').get(auth, getUserProfile).patch(auth, updateUserProfile)
router
  .route('/:id')
  .get(auth, adminAuth, getUserById)
  .patch(auth, adminAuth, updateUser)
  .delete(auth, adminAuth, deleteUser)

export default router
