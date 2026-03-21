const TeacherTraining = require('../models/TeacherTraining')
const { uploadToCloudinary } = require('../config/cloudinary')

exports.getAll = async (req, res, next) => {
  try {
    const filter = req.query.type
      ? { type: req.query.type, isActive: true }
      : { isActive: true }
    const programs = await TeacherTraining.find(filter).sort({ order: 1 })
    res.json({ success: true, data: programs })
  } catch (err) { next(err) }
}

exports.getOne = async (req, res, next) => {
  try {
    const program = await TeacherTraining.findById(req.params.id)
    if (!program) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: program })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'videos', 'video')
      body.videoFile = result.secure_url
    }
    const program = await TeacherTraining.create(body)
    res.status(201).json({ success: true, data: program })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'videos', 'video')
      body.videoFile = result.secure_url
    }
    const program = await TeacherTraining.findByIdAndUpdate(req.params.id, body, { new: true })
    if (!program) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: program })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await TeacherTraining.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}