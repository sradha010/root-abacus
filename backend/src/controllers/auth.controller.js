const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email }
    })
  } catch (err) { next(err) }
}

exports.getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin })
}