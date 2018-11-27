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
            console.log("A DB connection pool has not been created.");
            console.log("Try re-starting the service.");
            console.log(dbConnectionError);
            res.json({ msg: "Unable to establish DB connection." });
            return;
        }

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


        console.log("building query...");
        let userInsertQuery;
        { // delimits scope of 1-time-use function.
            let { buildUserInsertQuery } = require("../../../utils/db");
            userInsertQuery = await buildUserInsertQuery(req.body);
        }

        let dbResult;
        try
        {
            console.log("querying to DB...");
            console.log("inserting User...");
            dbResult = await dbRequest.query(userInsertQuery);

            let msg = "User successfully created.";
            console.log(msg);
            // console.log(dbResult);
            res.status(200).json({ msg })
        }
        catch (dbResultsError) {
            let msg = "An error occurred while trying to create a new user.";
            console.log(msg);
            console.log(dbResultsError);

            res.status(500).json({ msg });
        }
        finally
        {
            dbRequest.cancel();
            console.log("DB request ended.");
        }

    } // end of createUser

}
