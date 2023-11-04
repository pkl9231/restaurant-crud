import { Sequelize } from 'sequelize';

const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'lohani1234',
    database: 'restaurant',
});

export default connection;
