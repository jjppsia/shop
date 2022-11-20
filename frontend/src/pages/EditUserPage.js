import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import { FormContainer, Loader, Message } from '../components'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function EditUserPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetails = useSelector((state) => state.userDetails)
  const userUpdate = useSelector((state) => state.userUpdate)

  const { loading: loadingDetails, error: errorDetails, user } = userDetails
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    const { _id, name, email, isAdmin } = user

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    }

    if (!name || _id !== id) {
      dispatch(getUserDetails(id))
    }

    setName(name)
    setEmail(email)
    setIsAdmin(isAdmin)
  }, [dispatch, id, navigate, successUpdate, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
