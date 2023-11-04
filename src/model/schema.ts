import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Restaurant extends Model {
    public restaurant_id!: string;
    public name!: string;
    public address!: string;
    public vegOnly!: boolean;
    public cost!: 'Low' | 'Medium' | 'High';
    public cusineTypes!: string[];
    public createdAt!: Date;
    public updatedAt!: Date;
    public isOpen!: boolean;
}

Restaurant.init(
    {
        restaurant_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
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
    },
    {
        sequelize,
        timestamps: false, // Disable default timestamps (createdAt, updatedAt)
        underscored: true, // Use snake_case for column names
        tableName: 'restaurants', // Set the table name explicitly
    }
);

// Synchronize the model with the database
sequelize.sync()
    .then(() => {
        console.log('Restaurant model synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing model:', err);
    });

export default Restaurant;
