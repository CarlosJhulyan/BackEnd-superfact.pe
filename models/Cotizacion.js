const Sequelize = require('sequelize');
const db = require('../mysql');

const Cotizacion = db.define('cotizacion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: Sequelize.STRING(60),
    email: Sequelize.STRING(60),
    numberPhone: Sequelize.INTEGER,
    social: Sequelize.STRING(60),
    businessName: Sequelize.STRING(60),
    interested: Sequelize.STRING(60),
    requestNumber: Sequelize.STRING(9)
}, {
    hooks: {
        afterCreate(cotizacion) {
            const id = cotizacion.id
            const position = String(id).length - 1;
            const array = [`000${id}`, `00${id}`, `0${id}`, id];
            cotizacion.requestNumber = `${array[position]}-${new Date().getFullYear()}`;
        }
    }
})

module.exports = Cotizacion;