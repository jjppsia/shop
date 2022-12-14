import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { Loader, Message } from '../components'
import { listTopRatedProducts } from '../actions/productActions.js'
import { useDispatch, useSelector } from 'react-redux'

function ProductCarousel() {
  const dispatch = useDispatch()
  const productTopRated = useSelector((state) => state.productTopRated)

  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel className='bg-dark' pause='hover'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
