const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db/connection")

const Restaurant = sequelize.define('Restaurant', {
    restaurant_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vegOnly: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    cost: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
    },
    cusineTypes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: false, // Disable default timestamps (createdAt, updatedAt)
    underscored: true, // Use snake_case for column names
    tableName: 'restaurants', // Set the table name explicitly
});

// Synchronize the model with the database
sequelize.sync()
    .then(() => {
        console.log('Restaurant model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing model:', err);
    });

module.exports = Restaurant;