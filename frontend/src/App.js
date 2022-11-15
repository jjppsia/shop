import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components'
import { CartPage, HomePage, LoginPage, ProductPage } from './pages'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart'>
              <Route index element={<CartPage />} />
              <Route path=':id' element={<CartPage />} />
            </Route>
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
