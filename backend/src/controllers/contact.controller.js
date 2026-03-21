const ContactInfo = require('../models/ContactInfo')

exports.getContact = async (req, res, next) => {
  try {
    let info = await ContactInfo.findOne()
    if (!info) info = await ContactInfo.create({})
    res.json({ success: true, data: info })
  } catch (err) { next(err) }
}

exports.updateContact = async (req, res, next) => {
  try {
    let info = await ContactInfo.findOne()
    if (!info) info = new ContactInfo()
    Object.assign(info, req.body)
    await info.save()
    res.json({ success: true, data: info })
  } catch (err) { next(err) }
}