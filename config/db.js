const Sequelize = require('sequelize');
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword,  {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;