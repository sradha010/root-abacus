const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String, default: 'Parent' },
  content:  { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order:    { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Testimonial', testimonialSchema)