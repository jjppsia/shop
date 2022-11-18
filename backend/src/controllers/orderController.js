import { StatusCodes } from 'http-status-codes'
import Order from '../models/orderModel.js'

/**
 * @desc    Create new order
 * @route   GET /api/v1/orders
 * @access  Private
 */
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(StatusCodes.BAD_REQUEST)
      throw new Error('No order items')
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    res.status(StatusCodes.CREATED).json(order)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Private
 */
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Get order by ID
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  const { id: _id } = req.params

  try {
    const order = await Order.findById({ _id }).populate('user', 'name email')

    if (!order) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('Order not found')
    }

    res.json(order)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Update order to paid
 * @route   PATCH /api/v1/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = async (req, res) => {
  const { id: _id } = req.params
  const { id, status, update_time, payer } = req.body

  try {
    const order = await Order.findById({ _id })

    if (!order) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('Order not found')
    }

    const updatedOrder = await Order.updateOne(
      { _id },
      {
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id,
          status,
          update_time,
          payer: {
            name: `${payer.name.given_name} ${payer.name.surname}`,
            email: payer.email_address
          }
        }
      }
    )

    res.status(StatusCodes.OK).json(updatedOrder)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

/**
 * @desc    Update order to delivered
 * @route   GET /api/v1/orders/myorders
 * @access  Private
 */
const getUserOrders = async (req, res) => {
  const { _id } = req.user

  try {
    const orders = await Order.find({ user: _id })

    if (!orders) {
      res.status(StatusCodes.NOT_FOUND)
      throw new Error('Order not found')
    }

    res.json(orders)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}

export { addOrderItems, getOrders, getOrderById, updateOrderToPaid, getUserOrders }
