/**
 * @file Database utilities
 */

const { db } = require("../../db/config.json");
const Sequelize = require("sequelize");

exports.dbConnection = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    dialect: db.dialect["mssql"],
    dialectOptions: {
        encrypt: true
    },
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});