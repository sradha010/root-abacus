const Job = require('../models/Job')

exports.getActive = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 })
    res.json({ success: true, data: jobs })
  } catch (err) { next(err) }
}

exports.getAll = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json({ success: true, data: jobs })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const job = await Job.create(req.body)
    res.status(201).json({ success: true, data: job })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: job })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}