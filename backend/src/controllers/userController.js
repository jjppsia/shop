import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

/**
 * @desc    Register a user
 * @route   POST /api/v1/users
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      res.status(StatusCodes.BAD_REQUEST)
      throw new Error('User already exists')
    }

    const newUser = await User.create({
      name,
      email,
      password
    })

    if (!newUser) {
      res.status(StatusCodes.BAD_REQUEST)
      throw new Error('Invalid user data')
    }

    res.status(StatusCodes.CREATED).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Auth user & get token
 * @route   POST /api/v1/users/login
 * @access  Public
 */
const authUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      res.status(StatusCodes.UNAUTHORIZED)
      throw new Error('Invalid email or password')
    }

    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Get user by ID
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */

const getUserById = async (req, res) => {
  const { id: _id } = req.params

  try {
    const user = await User.findById({ _id }).select('-password')

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Get user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  const { _id } = req.user

  try {
    const user = await User.findById({ _id })

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Update user
 * @route   PATCH /api/v1/users/:id
 * @access  Private/Admin
 */

const updateUser = async (req, res) => {
  const { id: _id } = req.params
  const { name, email, isAdmin } = req.body

  try {
    const user = await User.findById({ _id })

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate({ _id }, { name, email, isAdmin }, { new: true })

    res.status(StatusCodes.OK).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Update user profile
 * @route   PATCH /api/v1/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  const { _id } = req.user
  const { name, email, password } = req.body

  try {
    const user = await User.findById({ _id })

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate({ _id }, { name, email, password }, { new: true })

    res.status(StatusCodes.OK).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Delete a user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res) => {
  const { id: _id } = req.params

  try {
    const user = await User.findById({ _id })

    if (!user) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('User not found')
    }

    await User.deleteOne({ _id })

    res.status(StatusCodes.OK).json({ message: 'User removed' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

export { registerUser, authUser, getUsers, getUserById, getUserProfile, updateUser, updateUserProfile, deleteUser }
