const router = require('express').Router()
const ctrl = require('../controllers/jobs.controller')
const { protect } = require('../middleware/authMiddleware')

router.get('/', ctrl.getActive)
router.get('/all', protect, ctrl.getAll)
router.post('/', protect, ctrl.create)
router.put('/:id', protect, ctrl.update)
router.delete('/:id', protect, ctrl.remove)

module.exports = router