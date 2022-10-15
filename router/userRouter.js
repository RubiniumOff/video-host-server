const { Router } = require('express')
const router = Router()
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.get('/', AuthMiddleware.checkUserRoleAdmin, UserController.getAll)
router.get('/:id', AuthMiddleware.checkUserRoleAdminAndThis, UserController.getOne)
router.post('/', AuthMiddleware.checkUserRoleAdmin, UserController.create)
router.put('/', AuthMiddleware.checkUserRoleAdminAndThis, UserController.update)
router.delete('/', AuthMiddleware.checkUserRoleAdminAndThis, UserController.delete)

module.exports = router