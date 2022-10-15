const ApiError = require("../error/ApiError")
const { Channel } = require("../model/model")

class ChannelController {
    async getAll(req, res, next) {
        let {limit, page} = req.body
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit
        const channels = await Channel.findAndCountAll({limit, offset})
        return res.json(channels)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!id) return next(ApiError.badRequest('Не достаточно данных для обработки запроса'))
        const channel = await Channel.findOne({where: {id}})
        if (!channel) return next(ApiError.badRequest('Канала с таким ID не существует'))
        return res.json(channel)
    }

    async create(req, res, next) {
        const {userId, link, name, description, ban, verefy} = req.body
        if (!userId, !name) return next(ApiError.badRequest('Не достаточно данныъ для обработки запроса'))
        const channel = await Channel.create({userId, link, name, description})
        return res.json(channel)
    }

    async delete(req, res, next) {
        const {id} = req.body
        if (!id) return next(ApiError.badRequest('Не достаточно данных ждя обработки запроса'))
        await Channel.destroy({where: {id}})
        return res.json({message: `Канал с ID ${id} успешно удалён`})
    }

    async update(req, res, next) {
        const {id, userId, link, name, description, ban, verefy} = req.body
        if (!id) return next(ApiError.badRequest('Не достаточно данных для обработки запроса'))
        await Channel.update({id, userId, link, name, description, ban, verefy, where: {id}})
        return res.json({message: `Канал с ID ${id} успешно обновлено`})
    }
}

module.exports = new ChannelController()