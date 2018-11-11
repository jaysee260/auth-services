/**
 * @file Authentication utilities
 */

exports.checkWhitelist = function (req, res, next) {
    const { dbConnection } = require("../db");
    /** @todo
     * query DB.
     * if email is found in whitelist, proceed ( next() ).
     * otherwise, terminate request with appropriate status code and message.
     */

    console.log("initiating DB connection test...");
    
     dbConnection.authenticate()
        .then(() => {
            // do DB things.
            console.log("DB connection successfull.");
            console.log("This is where the whitelist would be checked.");

            console.log("closing DB connection....");
            dbConnection.close()
                .then(() => {
                    console.log("DB connection closed.");
                    next();
                })
                .catch((error) => {
                    console.log("Could not close DB connection...");
                    console.log(error);
                    res.status(505).send("Something went wrong.");
                });
            
        })
        .catch((error) => {
            console.log("Attempt to establish connection with DB failed.");
            console.log(error);
            res.status(505).send("Something went wrong.");
        });
}


exports.generateJwt = function ({ secret, issuer, subject, jwtid, expiresIn }) {
    // Module has self contained dependencies
    const jwt = require("jsonwebtoken");

    let payload = Date.now();
    
    return jwt.sign({ payload }, secret, { issuer, subject, jwtid, expiresIn });
}