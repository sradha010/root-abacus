const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  type:        { type: String, enum: ['abacus', 'vedic', 'teacher-training'], required: true },
  description: { type: String, required: true },
  ageGroup:    { type: String, default: '' },
  duration:    { type: String, default: '' },
  highlights:  [{ type: String }],
  videoType:   { type: String, enum: ['youtube', 'upload', 'none'], default: 'none' },
  videoUrl:    { type: String, default: '' },
  videoFile:   { type: String, default: '' },
  thumbnail:   { type: String, default: '' },
  isActive:    { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)