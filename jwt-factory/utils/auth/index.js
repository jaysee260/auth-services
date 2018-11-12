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
            req.jwtPayload = null;
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

exports.checkWhitelistPost = function (req, res, next) {
    const { dbConnection } = require("../db");
    /** @todo
     * query DB.
     * if email is found in whitelist, proceed ( next() ).
     * otherwise, terminate request with appropriate status code and message.
     */
     const { email } = req.body;
     /** @todo validate email before putting it in query! */
     const query = `
        SELECT 
            wl.email,
            usr.first_name,
            usr.last_name
        FROM Whitelist as wl
            INNER JOIN Users as usr on wl.email = usr.email
        WHERE wl.email = '${email}'`;
     
    console.log("initiating DB connection test...");
     dbConnection.authenticate()
        .then(() => {
            // do DB things.
            console.log("DB connection successfull.");
            console.log("This is where the whitelist would be checked.");
            // req.jwtPayload = null;

            /** @todo spread callback can expect JwtPayload[]; leverage interface */
            dbConnection.query(query).spread((results, metadata) => {
                console.log("closing DB connection....");
                dbConnection.close()
                    .then(() => {

                        console.log("DB connection closed.");
                        console.log({ results });
                        // check results; if valid attach to payload
                        // expects only one result, always
                        if (results.length === 1) {
                            function makeJwtPayload(dbResults) {
                                return {
                                    name: dbResults.first_name.trim() + " " + dbResults.last_name.trim(),
                                    email: dbResults.email
                                }
                            }
                            req.jwtPayload = makeJwtPayload(results[0]);
                            next();
                        } else {
                           let msg = "You are not authorized to receive a token.";
                           res.status(401).json({ msg }); 
                        }
                        
                    })
                    .catch((error) => {
                        console.log("Could not close DB connection...");
                        console.log(error);
                        res.status(505).send("Something went wrong.");
                    });

            }).catch((error) => {
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

exports.validatePayload = function (jwtPayload) {

}


exports.generateJwt = function ({ secret, options }, payload) {
    const jwt = require("jsonwebtoken");

    // payload = payload !== null ? payload : Date.now();
    // let tempPayload = { name: "juan", email: "myemail@email.com", admin: true };
    return jwt.sign(payload, secret, options);
}