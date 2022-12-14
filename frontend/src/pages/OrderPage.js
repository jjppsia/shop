import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import { Loader, Message } from '../components'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import { calculateOrderPrices } from '../utils/calculatePrices'

function OrderPage() {
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()

  const orderId = params.id

  const userLogin = useSelector((state) => state.userLogin)
  const orderDetails = useSelector((state) => state.orderDetails)
  const orderPay = useSelector((state) => state.orderPay)
  const orderDeliver = useSelector((state) => state.orderDeliver)

  const { userInfo } = userLogin
  const { loading: loadingOderDetails, error, order } = orderDetails
  const { loading: loadingOrderPay, success: successOrderPay } = orderPay
  const { loading: loadingOrderDeliver, success: successOrderDeliver } = orderDeliver

  if (!loadingOderDetails) {
    order.itemsPrice = calculateOrderPrices(order).itemsPrice
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/v1/config/paypal')
      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => setSdkReady(true)

      document.body.appendChild(script)
    }

    if (!order || successOrderPay || successOrderDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }

    if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }

      setSdkReady(true)
    }
  }, [dispatch, orderId, order, successOrderPay, successOrderDeliver])

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const handleDeliverOrder = () => {
    dispatch(deliverOrder(order))
  }

  return loadingOderDetails ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingOrderPay && <Loader />}
                  {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={handleSuccessPayment} />}
                </ListGroup.Item>
              )}
              {loadingOrderDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item className='d-grid gap-2'>
                  {loadingOrderDeliver && <Loader />}
                  <Button type='button' className='btn btn-block' onClick={handleDeliverOrder}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage
