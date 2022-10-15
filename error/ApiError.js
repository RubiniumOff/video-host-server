class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        if (!message) return new ApiError(400, 'Полученых данных не достаточно для обработки запроса')
        return new ApiError(400, message)
    }
    
    static internal(message) {
        return new ApiError(500, message)
    }
    
    static forbidden(message) {
        if (!message) return new ApiError(403, 'Доступ запрещён')
        return new ApiError(403, message)
    }

    static unauthorized(message) {
        if (!message) return new ApiError(401, 'Пользователь не авторизован')
        return new ApiError(401, message)
    }
}

module.exports = ApiError