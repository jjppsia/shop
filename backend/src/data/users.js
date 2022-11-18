import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123123', 10),
    isAdmin: true
  },
  {
    name: 'Jp Sia',
    email: 'jp@gmail.com',
    password: bcrypt.hashSync('123123', 10)
  }
]

export default users
