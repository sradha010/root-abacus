require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(helmet())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use('/api', limiter)

app.use('/api/auth',             require('./routes/auth.routes'))
app.use('/api/courses',          require('./routes/courses.routes'))
app.use('/api/teacher-training', require('./routes/teacherTraining.routes'))
app.use('/api/testimonials',     require('./routes/testimonials.routes'))
app.use('/api/reviews',          require('./routes/reviews.routes'))
app.use('/api/jobs',             require('./routes/jobs.routes'))
app.use('/api/contact',          require('./routes/contact.routes'))
app.use('/api/settings',         require('./routes/settings.routes'))
app.use('/api/enquiry',          require('./routes/enquiry.routes'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Roots Abacus API running' })
})

app.use(errorHandler)

module.exports = app