require('dotenv').config()
const connectDB = require('./config/db')
const Admin = require('./models/Admin')

connectDB().then(async () => {
  
  // ✅ Check first — never blindly delete
  const existingAdmin = await Admin.findOne({ email: 'admin@rootsabacus.com' })

  if (existingAdmin) {
    console.log('✅ Admin already exists, skipping creation.')
    console.log('Email: admin@rootsabacus.com')
    process.exit()
  }

  await Admin.create({
    name: 'Super Admin',
    email: 'admin@rootsabacus.com',
    password: 'Admin@1234'
  })

  console.log('✅ Admin created successfully!')
  console.log('Email: admin@rootsabacus.com')
  console.log('Password: Admin@1234')
  process.exit()

}).catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})