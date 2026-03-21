const mongoose = require('mongoose')

const contactInfoSchema = new mongoose.Schema({
  phones:       [{ type: String }],
  emails:       [{ type: String }],
  address:      { type: String, default: '' },
  mapsEmbed:    { type: String, default: '' },
  workingHours: { type: String, default: 'Mon-Sat, 9am-6pm' },
}, { timestamps: true })

module.exports = mongoose.model('ContactInfo', contactInfoSchema)