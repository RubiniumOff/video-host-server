const { User } = require('../model/model')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')

class UserController {
    async getAll(req, res, next) {
        let {limit, page} = req.body
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit
        const users = await User.findAndCountAll({limit, offset})
        return res.json(users)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!id) return next(ApiError.badRequest())
        const user = await User.findOne({where: {id}})
        if (!user) return next(ApiError.badRequest('Пользователя с таким ID не существует'))
        return res.status(200).json(user)
    }

    async create(req, res, next) {
        const {nickname, email, password, role, ban} = req.body
        if (!nickname || !email || !password) return next(ApiError.badRequest())
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({nickname, email, password: hashPassword, role, ban})
        return res.json(user)
    }

    async delete(req, res, next) {
        const {id} = req.body
        if (!id) return next(ApiError.badRequest())
        await User.destroy({where: {id}})
        return res.json({message: `Пользователь с ID: ${id} удалён`})
    }

    async update(req, res, next) {
        const {id, nickname, email, password, role, ban} = req.body
        if (!id) return next(ApiError.badRequest())
        const user = await User.update({nickname, email, password, role, ban}, {where: {id}})
        res.send(user)
    }
}

module.exports = new UserController()