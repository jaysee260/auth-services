const { pool } = require("../../../utils/db");
const { reqBodyIsEmpty } = require("../../../utils/api/validation");



exports.userController = {

    createUser: async (req, res) => {
        if ( reqBodyIsEmpty(req.body) ) {
            res.send("Request body cannot be empty.");
            return;
        }
        
        try
        {
            await pool; // ensures that the pool has been created
        }
        catch (dbConnectionError)
        {
            console.log("A DB pool has not been created.");
            console.log("Try re-starting the service.");
            console.log(dbConnectionError);
            res.json({ msg: "Unable to establish DB connection." });
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
        const { first_name, last_name, email, username, password } = req.body;
        const userInsertQuery = `
            INSERT INTO Users (first_name, last_name, email, username, password)
            VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${password}')
        `;

        let dbRequest;
        try
        {
            console.log("creating DB request...");
            dbRequest = await pool.request();
        }
        catch (dbRequestError)
        {
            console.log("error creating DB request.");
            console.log("will not attempt to create User.");
            console.log(dbRequestError);
            res.status(500).json({
                msg: "DB request failed."
            });
            return;
        }


        let dbResult;
        try
        {
            console.log("querying to DB...");
            console.log("inserting User...");
            dbResult = await dbRequest.query(userInsertQuery);

            let msg = "User successfully created.";
            console.log(msg);
            console.log(dbResult);
            res.status(200).json({ msg })
        }
        catch (dbQueryError) {
            let msg = "An error occurred while trying to create new user.";
            console.log(msg);
            console.log(dbQueryError);

            res.status(500).json({ msg });
        }
        finally
        {
            dbRequest.cancel();
            console.log("DB request ended.");
        }

    } // end of createUser

}
