const { Router } = require('express')
const VideoController = require('../controllers/VideoController')
const router = Router()

router.get('/', VideoController.getAll)
router.get('/:id', VideoController.getOne)
router.post('/', VideoController.create)
router.delete('/', VideoController.delete)
router.put('/', VideoController.update)

module.exports = router