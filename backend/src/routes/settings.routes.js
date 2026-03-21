const router = require('express').Router()
const ctrl = require('../controllers/settings.controller')
const { protect } = require('../middleware/authMiddleware')
const { uploadImage } = require('../config/cloudinary')

router.get('/',  ctrl.getSettings)
router.put('/',  protect, uploadImage.single('logo'), ctrl.updateSettings)

module.exports = router