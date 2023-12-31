const router = require('express').Router()
const drawingController = require('../controllers/drawingController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/createDrawing', protect, drawingController.createDrawing)
router.post('/saveDrawing', protect, drawingController.saveDrawing)
router.get('/getIndividualDrawing/:id', protect, drawingController.getIndividualDrawing)
router.get('/drawingList', protect, drawingController.getDrawings)
router.post('/editName', protect, drawingController.editName)
router.get('/deleteDrawing/:id', protect, drawingController.deleteDrawing)


module.exports = router