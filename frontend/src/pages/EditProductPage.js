import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { FormContainer, Loader, Message } from '../components'

function EditProductPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(false)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const productDetails = useSelector((state) => state.productDetails)
  const productUpdate = useSelector((state) => state.productUpdate)

  const { userInfo } = userLogin
  const { loading: loadingDetails, error: errorDetails, product } = productDetails
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    const { _id, name, price, image, brand, category, countInStock, description } = product

    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' })
      navigate(`/admin/productlist`)
    }

    if (!name || _id !== id) {
      dispatch(listProductDetails(id))
    }

    setName(name)
    setPrice(price)
    setImage(image)
    setBrand(brand)
    setCategory(category)
    setCountInStock(countInStock)
    setDescription(description)
  }, [dispatch, id, navigate, product, successUpdate])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateProduct({ id, name, price, image, brand, category, countInStock, description }))
    dispatch({ type: 'PRODUCT_UPDATE_REQUEST' })
  }

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('image', file)
      setUploading(true)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post('/api/v1/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant='danger'>{errorDetails}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price || 0}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formFile'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={handleFileUpload} required />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group className='mb-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand || ''}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock || 0}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductPage
