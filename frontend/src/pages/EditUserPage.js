import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import { FormContainer, Loader, Message } from '../components'

const EditUserPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  useEffect(() => {
    const { _id, name, email, isAdmin } = user

    if (!name || _id !== id) {
      dispatch(getUserDetails(id))
    }

    setName(name)
    setEmail(email)
    setIsAdmin(isAdmin)
  }, [dispatch, id, user])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Set as Admin?'
                checked={isAdmin || false}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUserPage
