const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const cors = require('cors')
const sequelize = require('./db')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 5001
const router = require('./router/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`Сервер запущен и использует порт ${PORT}`) })
    } catch (e) {
        console.log(e);
    }
}

start()