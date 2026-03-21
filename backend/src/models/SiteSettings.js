const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema({
  logoUrl:     { type: String, default: '' },
  footerText:  { type: String, default: '2026 Roots Abacus Learning School. All rights reserved.' },
  footerLinks: [{ label: String, url: String }],
  socialLinks: {
    facebook:  { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube:   { type: String, default: '' },
    whatsapp:  { type: String, default: '' },
  },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)