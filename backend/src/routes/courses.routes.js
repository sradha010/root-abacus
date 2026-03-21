const router = require('express').Router()
const ctrl = require('../controllers/courses.controller')
const { protect } = require('../middleware/authMiddleware')
const { uploadVideo } = require('../config/cloudinary')

router.get('/',    ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/',   protect, uploadVideo.single('videoFile'), ctrl.create)
router.put('/:id', protect, uploadVideo.single('videoFile'), ctrl.update)
router.delete('/:id', protect, ctrl.remove)

module.exports = router