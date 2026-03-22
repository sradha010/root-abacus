const router = require('express').Router()
const ctrl   = require('../controllers/trainer.controller')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', ctrl.register)
router.post('/login',    ctrl.login)
router.get('/all',       protect, ctrl.getAll)  // admin only

module.exports = router