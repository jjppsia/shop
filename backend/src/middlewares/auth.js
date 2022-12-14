import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Not authorized')
    }

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password -__v -createdAt -updatedAt')

    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message })
  }
}

const adminAuth = (req, res, next) => {
  const { isAdmin } = req.user

  try {
    if (!isAdmin) {
      throw new Error('Not authorized as an admin')
    }

    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message })
  }
}

export { verifyToken, adminAuth }
