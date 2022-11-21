import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (keyword.trim() === '') {
      navigate('/')

      return
    }

    navigate(`/search/${keyword}`)
  }

  return (
    <Form className='d-flex' onSubmit={handleSubmit}>
      <Form.Control
        type='search'
        className='me-2'
        name='q'
        placeholder='Search'
        aria-label='Search'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
