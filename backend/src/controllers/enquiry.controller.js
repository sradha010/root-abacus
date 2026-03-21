const Enquiry = require('../models/Enquiry')

exports.submit = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create(req.body)
    res.status(201).json({ success: true, message: 'Enquiry received', data: enquiry })
  } catch (err) { next(err) }
}

exports.getAll = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json({ success: true, data: enquiries })
  } catch (err) { next(err) }
}

exports.markRead = async (req, res, next) => {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { isRead: true })
    res.json({ success: true, message: 'Marked as read' })
  } catch (err) { next(err) }
}

exports.remove = async (req, res, next) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}