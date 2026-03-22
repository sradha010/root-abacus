const Trainer = require('../models/Trainer')
const jwt     = require('jsonwebtoken')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

// POST /api/trainers/register
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, country, whatsapp, courseType, password } = req.body

    if (!firstName || !lastName || !email || !country || !whatsapp || !courseType || !password)
      return res.status(400).json({ success: false, message: 'All fields are required' })

    const existing = await Trainer.findOne({ email })
    if (existing)
      return res.status(400).json({ success: false, message: 'Email already registered' })

    const trainer = await Trainer.create({
      firstName, lastName, email, country, whatsapp, courseType, password
    })

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token: generateToken(trainer._id),
      trainer: {
        id:         trainer._id,
        firstName:  trainer.firstName,
        lastName:   trainer.lastName,
        email:      trainer.email,
        courseType: trainer.courseType,
      }
    })
  } catch (err) { next(err) }
}

// POST /api/trainers/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Please provide email and password' })

    const trainer = await Trainer.findOne({ email })
    if (!trainer || !(await trainer.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' })

    res.json({
      success: true,
      token: generateToken(trainer._id),
      trainer: {
        id:         trainer._id,
        firstName:  trainer.firstName,
        lastName:   trainer.lastName,
        email:      trainer.email,
        courseType: trainer.courseType,
      }
    })
  } catch (err) { next(err) }
}

// GET /api/trainers/all  (admin only)
exports.getAll = async (req, res, next) => {
  try {
    const trainers = await Trainer.find().select('-password').sort({ createdAt: -1 })
    res.json({ success: true, data: trainers })
  } catch (err) { next(err) }
}