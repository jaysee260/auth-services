
const { pool } = require("../../../utils/db");

exports.jwtFactoryController = {
    issueToken: (req, res) => {
        /** 
         * if the whitelist check passses, we should attach a proper
         * payload to the request object (jwtPayload).
         * If program control has reached this endpoint, we can then
         * assume there's a jwtPayload object attached to the request.
         */
        const { jwt : jwtSettings } = require("../../../config");
        const { generateJwt } = require("../../../utils/auth");
        let { jwtPayload } = req;

        /**
         * @todo
         * validate payload
         * reject or generate token
         */
        
        const token = generateJwt(jwtSettings, jwtPayload);
        const msg = req.whitelistCheckMsg; // attached inside checkWhitelist middleware method
        
        res.status(200).send({ msg, token });
    }
};