import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components' */
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

function CartPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

  useEffect(() => {
    if (!id) {
      return
    }

    dispatch(addToCart(id, qty))
  }, [dispatch, id, qty])

  return <div>CartPage</div>
}

export default CartPage
