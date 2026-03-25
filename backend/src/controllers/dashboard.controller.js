const Course       = require('../models/Course')
const Job          = require('../models/Job')
const Review       = require('../models/Review')
const ReviewMedia  = require('../models/ReviewMedia')
const Enquiry      = require('../models/Enquiry')
const Testimonial  = require('../models/Testimonial')
const Trainer      = require('../models/Trainer')

exports.getStats = async (req, res, next) => {
  try {
    const [courses, jobs, reviews, reviewMedia, enquiries, unreadEnquiries, testimonials, trainers] = await Promise.all([
      Course.countDocuments(),
      Job.countDocuments(),
      Review.countDocuments({ approved: false }),       // pending approval
      ReviewMedia.countDocuments(),
      Enquiry.countDocuments(),                         // total
      Enquiry.countDocuments({ isRead: false }),        // unread only
      Testimonial.countDocuments(),
      Trainer.countDocuments(),
    ])
    res.json({
      success: true,
      data: { courses, jobs, reviews, reviewMedia, enquiries, unreadEnquiries, testimonials, trainers }
    })
  } catch (err) { next(err) }
}