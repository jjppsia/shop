import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Loader, Message, Product } from '../components'
import { useParams } from 'react-router-dom'

function HomePage() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { keyword } = useParams()

  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}
export default HomePage
