const SiteSettings = require('../models/SiteSettings')
const { uploadToCloudinary } = require('../config/cloudinary')

exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne()
    if (!settings) settings = await SiteSettings.create({})
    res.json({ success: true, data: settings })
  } catch (err) { next(err) }
}

exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne()
    if (!settings) settings = new SiteSettings()

    // Handle both JSON body and FormData
    const body = req.body
    if (body.socialLinks && typeof body.socialLinks === 'string') {
      body.socialLinks = JSON.parse(body.socialLinks)
    }
    if (body.footerLinks && typeof body.footerLinks === 'string') {
      body.footerLinks = JSON.parse(body.footerLinks)
    }

    Object.assign(settings, body)

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'images', 'image')
      settings.logoUrl = result.secure_url
    }

    await settings.save()
    res.json({ success: true, data: settings })
  } catch (err) { next(err) }
}