const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    email_number: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    newsletter: DataTypes.BOOLEAN
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;
