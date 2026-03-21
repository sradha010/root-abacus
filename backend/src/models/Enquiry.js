const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true, lowercase: true },
  phone:   { type: String, default: '' },
  message: { type: String, default: '' },
  type:    { type: String, enum: ['callback', 'contact', 'franchise'], default: 'contact' },
  isRead:  { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Enquiry', enquirySchema)