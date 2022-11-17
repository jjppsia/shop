import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const auth = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Not authorized, no token')
    }

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { _id: decoded.id }

    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message })
  }
}

export { auth }
