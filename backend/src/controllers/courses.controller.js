const Course = require('../models/Course')
const { cloudinary, uploadToCloudinary } = require('../config/cloudinary')

exports.getAll = async (req, res, next) => {
  try {
    const filter = req.query.type
      ? { type: req.query.type, isActive: true }
      : { isActive: true }
    const courses = await Course.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: courses })
  } catch (err) { next(err) }
}

exports.getOne = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
    res.json({ success: true, data: course })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'videos', 'video')
      body.videoFile = result.secure_url
    }
    const course = await Course.create(body)
    res.status(201).json({ success: true, data: course })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'videos', 'video')
      body.videoFile = result.secure_url
    }
    const course = await Course.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true })
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' })
    res.json({ success: true, data: course })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Course deleted' })
  } catch (err) { next(err) }
}