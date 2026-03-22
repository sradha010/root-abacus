const Review      = require('../models/Review')
const ReviewMedia = require('../models/ReviewMedia')
const { uploadToCloudinary } = require('../config/cloudinary')

// ── Text Reviews ──────────────────────────────────────────
exports.getApproved = async (req, res, next) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: reviews })
  } catch (err) { next(err) }
}

exports.getAll = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json({ success: true, data: reviews })
  } catch (err) { next(err) }
}

exports.submit = async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).json({ success: true, message: 'Review submitted, pending approval', data: review })
  } catch (err) { next(err) }
}

exports.approve = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
    res.json({ success: true, data: review })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}

// ── Media (Videos & Images) ───────────────────────────────
exports.getMedia = async (req, res, next) => {
  try {
    const filter = { isActive: true }
    if (req.query.type)       filter.type       = req.query.type
    if (req.query.courseType) filter.courseType = req.query.courseType
    const media = await ReviewMedia.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.getAllMedia = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.type)       filter.type       = req.query.type
    if (req.query.courseType) filter.courseType = req.query.courseType
    const media = await ReviewMedia.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.createMedia = async (req, res, next) => {
  try {
    const { type, alt, order, isActive, courseType } = req.body
    let url = req.body.url || ''

    if (req.file) {
      const resourceType = type === 'video' ? 'video' : 'image'
      const folder       = type === 'video' ? 'review_videos' : 'review_images'
      const result       = await uploadToCloudinary(req.file.buffer, folder, resourceType)
      url = result.secure_url
    }

    if (!url) return res.status(400).json({ success: false, message: 'File or URL is required' })

    const media = await ReviewMedia.create({
      type,
      url,
      alt:        alt        || '',
      order:      order      || 0,
      isActive:   isActive   !== undefined ? isActive : true,
      courseType: courseType || 'general',
    })

    res.status(201).json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.updateMedia = async (req, res, next) => {
  try {
    const updates = { ...req.body }

    if (req.file) {
      const existing     = await ReviewMedia.findById(req.params.id)
      const resourceType = existing?.type === 'video' ? 'video' : 'image'
      const folder       = existing?.type === 'video' ? 'review_videos' : 'review_images'
      const result       = await uploadToCloudinary(req.file.buffer, folder, resourceType)
      updates.url = result.secure_url
    }

    const media = await ReviewMedia.findByIdAndUpdate(req.params.id, updates, { new: true })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.removeMedia = async (req, res, next) => {
  try {
    await ReviewMedia.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}