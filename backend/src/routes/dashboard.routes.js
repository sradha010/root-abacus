const router = require('express').Router()
const { getStats } = require('../controllers/dashboard.controller')
const { protect } = require('../middleware/authMiddleware')

router.get('/stats', protect, getStats)

module.exports = router