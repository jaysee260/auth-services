/**
 * @file Authentication utilities
 */

/** @desc
 * Query DB.
 * If email is found in whitelist, proceed ( next() ).
 * Otherwise, terminate request with appropriate status code and message.
 */
exports.checkWhitelist = async function (req, res, next) {
    if (!req.body.email) {
        res.send("No email was provided in the request body.");
        return;
    }

    const { pool } = require("../../utils/db");
    let msg; // response message

    try
    {
        await pool; // ensures that the pool has been created
    }
    catch (dbConnectionError)
    {
        console.log("A DB connection pool has not been created.");
        console.log("Try re-starting the service.");
        console.log(dbConnectionError);
        msg = "Unable to establish DB connection.";
        res.json({ msg });
        return;
    }

    /** NOTE:
     * Per the docs:
     *  > "All values are automatically sanitized against sql injection."
     * 
     * Reference: https://www.npmjs.com/package/mssql#connection-pools
     *            under ES6 Tagged template literals.
     */
    console.log("building query...");
     const { email } = req.body;
     const whitelistCheckQuery = `
        SELECT 
            wl.email,
            usr.id,
            usr.first_name,
            usr.last_name
        FROM Whitelist as wl
            INNER JOIN Users as usr on wl.email = usr.email
        WHERE wl.email = '${email}'`;

    let dbRequest;
    try
    {
        console.log("creating DB request...");
        dbRequest = await pool.request();
    }
    catch (dbRequestError)
    {
        console.log("error creating DB request.");
        console.log("will not attempt to check Whitelist.");
        console.log(dbRequestError);

        msg = "DB request failed."
        res.status(500).json({ msg });
        return;
    }

    let dbResult;
    try
    {
        console.log("querying to DB...");
        console.log("checking Whitelist...");
        dbResult = await dbRequest.query(whitelistCheckQuery);

        if (dbResult.recordset.length > 0) {
            function makeJwtPayload(user) {
                return {
                    user_id: user.id,
                    name: user.first_name.trim() + " " + user.last_name.trim(),
                    email: user.email
                }
            }

            msg = "Email found in Whitelist. Permission to obtain token GRANTED.";
            console.log(msg);
            // console.log(dbResult);

            // Attach jwtPayload to request and pass
            // control over to endpoint handler.
            req.jwtPayload = makeJwtPayload(dbResult.recordset[0]);
            req.whitelistCheckMsg = msg;
            next();

        } else {
            /** @todo idea: make your own ErrorType constructor */
            throw { type: { userNotFound: true } };
        }

    }
    catch (dbResultsError)
    {
        if (dbResultsError.type.userNotFound) {
            msg = "Email not found in Whitelist. Permission to obtain token DENIED. "
        } else {
            msg = "An error occurred while checking the whitelist.";
        }

        console.log(msg);
        console.log({ dbResultsError });

        res.status(500).json({ msg });
    }
    finally
    {
        dbRequest.cancel();
        console.log("DB request ended.");
    }
}

exports.validatePayload = function (req, res, next) {
    // check payload structure
    // check content? maybe redundant?
}


exports.generateJwt = function ({ secret, options }, payload) {
    const jwt = require("jsonwebtoken");
    // by this point we should have already validated the payload.
    /** @todo before calling jwt.sign... figure out logistics
     * to store the jwt's guid 
     */

    return jwt.sign(payload, secret, options);
}