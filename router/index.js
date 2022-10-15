const { Router } = require('express')
const router = Router()

const userRouter = require('./userRouter')
const channelRouter = require('./channelRouter')
const videoRouter = require('./videoRouter')
const authRouter = require('./authRouter')

router.use('/user', userRouter)
router.use('/channel', channelRouter)
router.use('/video', videoRouter)
router.use('/auth', authRouter)

module.exports = router