const router = require('express').Router()
const ctrl = require('../controllers/contact.controller')
const { protect } = require('../middleware/authMiddleware')

router.get('/', ctrl.getContact)
router.put('/', protect, ctrl.updateContact)

module.exports = router