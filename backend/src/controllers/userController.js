import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

/**
 * @desc    Auth user & get token
 * @route   POST /api/v1/users/login
 * @access  Public
 **/
const authUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      res.status(StatusCodes.UNAUTHORIZED)
      throw new Error('Invalid email or password')
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * @desc Get user profile
 * @route GET /api/v1/users/profile
 * @access Private
 **/

const getUserProfile = async (req, res) => {
  const { _id } = req.user

  try {
    const user = await User.findById(_id)

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export { authUser, getUserProfile }
