const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "localhost",
    username: "root",
    password: "lohani1234",
    database: "restaurant",
});

module.exports = sequelize;

