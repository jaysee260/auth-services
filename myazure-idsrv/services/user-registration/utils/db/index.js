/**
 * @file Database utilities
 */

const sql = require("mssql");
const { db : dbConfig } = require("../../../../config");


exports.pool = new sql.ConnectionPool(dbConfig);

exports.buildUserInsertQuery = async function (reqBody) {
    const { hashPassword } = require("../auth");
    const { first_name, last_name, email, username } = reqBody;
    const hashedPassword = await hashPassword(reqBody.password);
    delete reqBody.password;

     /** NOTE:
     * Per the docs:
     *  > "All values are automatically sanitized against sql injection."
     * 
     * Reference: https://www.npmjs.com/package/mssql#connection-pools
     *            under ES6 Tagged template literals.
     */
    return `
        INSERT INTO Users (first_name, last_name, email, username, password)
        VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${hashedPassword}')
    `;
}