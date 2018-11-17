/**
 * @file Database utilities
 */

const sql = require("mssql");
const { db:dbConfig } = require("../../config");


exports.pool = new sql.ConnectionPool(dbConfig);