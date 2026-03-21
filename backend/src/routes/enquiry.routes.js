const router = require('express').Router()
const ctrl = require('../controllers/enquiry.controller')
const { protect } = require('../middleware/authMiddleware')

router.post('/', ctrl.submit)
router.get('/', protect, ctrl.getAll)
router.put('/:id/read', protect, ctrl.markRead)
router.delete('/:id', protect, ctrl.remove)

module.exports = router