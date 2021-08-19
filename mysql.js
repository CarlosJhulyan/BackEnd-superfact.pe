const Sequelize = require('sequelize');
const dbConfig = require('./config/db');

const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql'
});

module.exports = sequelize;