const jwt = require("jsonwebtoken");
const { secret:jwt_secret } = require("./config/jwt.config");

module.exports = function authCheck(req, res, next) {
    /** @returns boolean */
    /** @desc Checks for JWT in Authoritzation headers */
    function checkForToken(authHeaders) {
        /** @todo simplify into ternary */
        return typeof authHeaders !== 'undefined' ? true : false;
    }
    
    /** @returns string */
    /** @desc Only gets called if checkForToken returns true */
    function extractJwt(headers) {
        const bearerHeader = headers.split(" ");
        return bearerHeader[1]; // this is the bearer token
    }

    /** @returns boolean */
    /** @desc Checks if JWT has expired */
    function validateJwt(token) {
        try {
            /** @todo check for more than just expiration
             * if the token has expired, such case will be handled
             * by the catch block. if it hasn't expired though, do
             * some more thorough validation like, checking the payload.
             * this would mean we'd need a standard for payloads.
             */
            let decoded = jwt.verify(token, "abracadabra");
            console.log(jwt_secret);
            
            console.log(decoded);
            return true;
        } catch (jwtValidationError) {
            console.log(jwtValidationError);
            return false;
        }
    }

    const responseMessageOptions = {
        accessDenied: "No token found in the Authorization Header. " +
        "This is a private route, you need permission to access it.",

        invalidToken: "Token is invalid (it may have expired). " + 
        "You may not proceed without a new token."
    }

    let responseMessage = {};

    // Start here

    let authHeaders = req.headers["authorization"];
    let tokenExists = checkForToken(authHeaders);

    if (tokenExists) {
        let token = extractJwt(authHeaders);
        /** @todo get validateJwt to actually validate */
        let tokenIsValid = validateJwt(token);

        if (tokenIsValid) {
            // Attach token to request object.
            req.token = token;
            // Move on to endpoint
            next();
        } else {
            responseMessage.body = responseMessageOptions.invalidToken;
            res.status(403).json(responseMessage);
        }

    } else {
        responseMessage.body = responseMessageOptions.accessDenied;
        // Generate response 404 - Forbidden
        res.status(403).json(responseMessage);
    }
}