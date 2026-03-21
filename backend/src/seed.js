require('dotenv').config()
const connectDB = require('./config/db')
const Admin = require('./models/Admin')

connectDB().then(async () => {
  await Admin.deleteMany()
  await Admin.create({
    name: 'Super Admin',
    email: 'admin@rootsabacus.com',
    password: 'Admin@1234'
  })
  console.log('Admin created!')
  console.log('Email: admin@rootsabacus.com')
  console.log('Password: Admin@1234')
  process.exit()
})