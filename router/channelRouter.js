const { Router } = require('express')
const ChannelController = require('../controllers/ChannelController')
const router = Router()

router.get('/', ChannelController.getAll)
router.get('/:id', ChannelController.getOne)
router.post('/', ChannelController.create)
router.delete('/', ChannelController.delete)
router.put('/', ChannelController.update)

module.exports = router