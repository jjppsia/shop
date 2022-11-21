import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPrivateRoute() {
  const userLogin = useSelector((state) => state.userLogin)
  const {
    userInfo: { isAdmin }
  } = userLogin

  if (!isAdmin) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default AdminPrivateRoute
