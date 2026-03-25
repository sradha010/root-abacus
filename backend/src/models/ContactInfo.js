const mongoose = require('mongoose')

const contactInfoSchema = new mongoose.Schema({
  phones:       [{ type: String }],
  emails:       [{ type: String }],
  address:      { type: String, default: '' },
  mapsEmbed:    { type: String, default: '' },
  workingHours: { type: String, default: 'Mon-Sat, 9am-6pm' },
  socialLinks: {
    facebook:  { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube:   { type: String, default: '' },
    linkedin:  { type: String, default: '' },
    whatsapp:  { type: String, default: '' },
  }
}, { timestamps: true })

module.exports = mongoose.model('ContactInfo', contactInfoSchema)