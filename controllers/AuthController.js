const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require("../model/model")

class AuthController {
    async register(req, res, next) {
        const {email, password, nickname} = req.body
        if (!email || !password || !nickname) return next(ApiError.badRequest())
        const checkUnique = await User.count({where: { email }})
        if (checkUnique !== 0) res.status(400).json({message: 'Пользователь с таким E-mail уже существует'})
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, nickname})
        const token = jwt.sign({id: user.id, email: user.email, nickname: user.nickname, role: user.role}, process.env.SECRET_KEY)
        return res.json({result: true, token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) return next(ApiError.badRequest())
        const user = await User.findOne({where: {email}})
        if (!user) return next(ApiError.badRequest('Пользователя с таким Email не существует'))
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) return next(ApiError.badRequest('Не правильно указан пароль'))
        const token = jwt.sign({id: user.id, email: user.email, nickname: user.nickname, role: user.role}, process.env.SECRET_KEY)
        return res.json({result: true, token})
    }

    async check(req, res, next) {
        if (!req.headers.authorization) return res.json({result: false})
        const token = req.headers.authorization.split(' ')[1]
        const checkToken = jwt.verify(token, process.env.SECRET_KEY)
        if (!checkToken) return next(ApiError.badRequest('Ошибка проверки токена'))
        const id = jwt.decode(token, process.env.SECRET_KEY).id
        const user = await User.findOne({
            where: {id: id},
            attributes: ['id', 'nickname', 'avatar', 'role']
        })
        return res.json(user.dataValues)
    }
}

module.exports = new AuthController()