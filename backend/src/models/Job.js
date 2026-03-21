const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title:             { type: String, required: true },
  description:       { type: String, required: true },
  location:          { type: String, default: 'Remote' },
  type:              { type: String, enum: ['full-time', 'part-time', 'freelance', 'contract'], default: 'part-time' },
  applyLink:         { type: String, default: '' },
  isActive:          { type: Boolean, default: true },

  // Detailed sections
  requirements:      [{ type: String }],
  responsibilities:  [{ type: String }],
  qualifications:    [{ type: String }],
  otherRequirements: [{ type: String }],

  // Extra info
  language:          { type: String, default: '' },
  timeType:          { type: String, default: '' },
  compensation:      { type: String, default: '' },
  schedule:          { type: String, default: '' },

}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)