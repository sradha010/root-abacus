const Testimonial = require('../models/Testimonial')

exports.getAll = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 })
    res.json({ success: true, data: testimonials })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body)
    res.status(201).json({ success: true, data: t })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: t })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}