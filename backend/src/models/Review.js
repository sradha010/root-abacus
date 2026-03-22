const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, trim: true, lowercase: true },
    rating:     { type: Number, required: true, min: 1, max: 5 },
    message:    { type: String, required: true, trim: true },
    courseType: { type: String, trim: true, default: 'general' }, // e.g. 'abacus-kids', 'vedic-maths'
    approved:   { type: Boolean, default: false },                 // admin approves before public display
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)