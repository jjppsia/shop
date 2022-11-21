import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import { Loader, Message, Paginate, Product, ProductCarousel } from '../components'

function HomePage() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { keyword, pageNumber } = useParams()

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
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
          <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}
export default HomePage
