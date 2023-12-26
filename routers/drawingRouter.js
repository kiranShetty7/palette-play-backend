const router = require('express').Router()
const drawingController = require('../controllers/drawingController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/createDrawing', protect, drawingController.createDrawing)
router.post('/saveDrawing', protect, drawingController.saveDrawing)


module.exports = router