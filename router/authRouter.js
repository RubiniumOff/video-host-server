const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/check', AuthController.check)

module.exports = router