const jwt = require('jsonwebtoken')

class AuthMiddleware {
    async checkUser(req, res, next) {
        if (!req.headers.authorization) return res.status(402).json({message: 'Пользователь не авторизован'})
        const token = req.headers.authorization.split(' ')[1]
        const check = jwt.verify(token, process.env.SECRET_KEY)
        if (!check) return res.status(400).json({message: 'Ошибка проверки токена'})
        return next()
    }

    async checkUserRoleAdmin(req, res, next) {
        if (!req.headers.authorization) return res.status(402).json({message: 'Пользователь не авторизован'})
        const token = req.headers.authorization.split(' ')[1]
        const userRole = jwt.decode(token, process.env.SECRET_KEY)?.role
        if (!userRole) return res.status(400).json({message: 'Ошибка чтения данных из токена'})
        if (userRole != 'ADMIN') res.status(403).json({message: 'Доступ запрещён'})
        return next()
    }

    async checkUserRoleAdminAndThis(req, res, next) {
        if (!req.headers.authorization) return res.status(402).json({message: 'Пользователь не авторизован'})
        const token = req.headers.authorization.split(' ')[1]
        const userRole = jwt.decode(token, process.env.SECRET_KEY)?.role
        const userID = jwt.decode(token, process.env.SECRET_KEY)?.id
        if (!userRole && !userID) return res.status(400).json({message: 'Ошибка чтения данных из токена'})
        if (userRole != 'ADMIN' && userID != req.params.id) return res.status(403).json({message: 'Доступ запрещён'})
        return next()
    }
}

module.exports = new AuthMiddleware()