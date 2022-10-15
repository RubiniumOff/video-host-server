const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: false, allowNull: false}, // ! Обязательно
    email: {type: DataTypes.STRING, unique: true, allowNull: false}, // ! Обязательно
    password: {type: DataTypes.STRING, unique: false, allowNull: false}, // ! Обязательно
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    ban: {type: DataTypes.BOOLEAN, defaultValue: false},
    avatar: {type: DataTypes.STRING, defaultValue: 'defaultAvatar.jpg'}
})

const Channel = sequelize.define('channel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    link: {type: DataTypes.STRING, allowNull: true},
    name: {type: DataTypes.STRING, allowNull: false}, // ! Обязательно
    description: {type: DataTypes.STRING, allowNull: true},
    avatar: {type: DataTypes.STRING, defaultValue: 'defaultChanelAvatar.jpg'},
    header: {type: DataTypes.STRING, defaultValue: 'defaultHeader.jpg'},
    ban: {type: DataTypes.BOOLEAN, defaultValue: false},
    verefy: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    preview: {type: DataTypes.STRING, defaultValue: 'defaultVideoPreview.jpg'},
    title: {type: DataTypes.STRING, allowNull: false}, // ! Обязательно
    description: {type: DataTypes.STRING, allowNull: true},
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
    views: {type: DataTypes.INTEGER, defaultValue: 0},
    quality: {type: DataTypes.INTEGER, defaultValue: 720}
    //* ChannelId - обязательный параметр
})

User.hasMany(Channel)
Channel.belongsTo(User)

Channel.hasOne(User)
User.belongsTo(Channel)

Channel.hasMany(Video)
Video.belongsTo(Channel)

module.exports = {
    User,
    Channel,
    Video
}