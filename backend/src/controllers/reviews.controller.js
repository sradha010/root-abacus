const Review      = require('../models/ReviewMedia')
const ReviewMedia = require('../models/ReviewMedia')

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
    const { type } = req.query
    const filter = { isActive: true }
    if (type) filter.type = type
    const media = await ReviewMedia.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.getAllMedia = async (req, res, next) => {
  try {
    const { type } = req.query
    const filter = {}
    if (type) filter.type = type
    const media = await ReviewMedia.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.createMedia = async (req, res, next) => {
  try {
    const media = await ReviewMedia.create(req.body)
    res.status(201).json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.updateMedia = async (req, res, next) => {
  try {
    const media = await ReviewMedia.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: media })
  } catch (err) { next(err) }
}

exports.removeMedia = async (req, res, next) => {
  try {
    await ReviewMedia.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}