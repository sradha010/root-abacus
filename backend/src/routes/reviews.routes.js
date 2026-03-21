const router = require('express').Router()
const ctrl   = require('../controllers/reviews.controller')
const { protect } = require('../middleware/authMiddleware')

// ── Text Reviews ──────────────────────────────────────────
router.get('/',              ctrl.getApproved)
router.get('/all',           protect, ctrl.getAll)
router.post('/',             ctrl.submit)
router.put('/:id/approve',   protect, ctrl.approve)
router.delete('/:id',        protect, ctrl.remove)

// ── Media (Videos & Images) ───────────────────────────────
router.get('/media',         ctrl.getMedia)               // public — active only, ?type=video|image
router.get('/media/all',     protect, ctrl.getAllMedia)    // admin — all, ?type=video|image
router.post('/media',        protect, ctrl.createMedia)
router.put('/media/:id',     protect, ctrl.updateMedia)
router.delete('/media/:id',  protect, ctrl.removeMedia)

module.exports = router