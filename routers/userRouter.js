const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/login', userController.login)
router.post('/sign-up', userController.register)


module.exports = router