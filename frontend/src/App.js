import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components'
import {
  AdminPrivateRoute,
  CartPage,
  EditProductPage,
  EditUserPage,
  HomePage,
  LoginPage,
  OrderPage,
  PaymentPage,
  PlaceOrderPage,
  PrivateRoute,
  ProductListPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
  ShippingPage,
  UserListPage
} from './pages'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<AdminPrivateRoute />}>
                <Route path='/admin/userlist' element={<UserListPage />} />
                <Route path='/admin/user/:id/edit' element={<EditUserPage />} />
                <Route path='/admin/productlist' element={<ProductListPage />} />
                <Route path='/admin/product/:id/edit' element={<EditProductPage />} />
              </Route>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/order/:id' element={<OrderPage />} />
            </Route>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
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
