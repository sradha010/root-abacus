const mongoose = require('mongoose')

const reviewMediaSchema = new mongoose.Schema({
  type:    { type: String, enum: ['video', 'image'], required: true },
  url:     { type: String, required: true },
  alt:     { type: String, default: '' },
  order:   { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('ReviewMedia', reviewMediaSchema)