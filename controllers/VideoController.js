const ApiError = require("../error/ApiError")
const { Video } = require("../model/model")

class VideoController {
    async getAll(req, res, next) {
        let {limit, page} = req.body
        limit = limit || 9
        page = page || 1
        const offset = page * limit - limit
        const videos = await Video.findAndCountAll({limit, offset})
        return res.json(videos)
    }

    async getOne(req, res, next) {
        const {id} = req.params.id
        if (!id) return next(ApiError.badRequest())
        const video = Video.findOne({where: {id}})
        return res.json(video)
    }

    async create(req, res, next) {
        const {channelId, title, description, quality} = req.body
        if (!channelId || !title) return next(ApiError.badRequest())
        const video = await Video.create({channelId, title, description, quality})
        return res.json(video)
    }

    async delete(req, res, next) {

    }

    async update(req, res, next) {
        
    }
}

module.exports = new VideoController()