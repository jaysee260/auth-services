const { pool } = require("../../../utils/db");

exports.userController = {

    createUser: async (req, res, next) => {
        if ( Object.keys(req.body).length === 0 ) {
            res.send("Request body cannot be empty.");
            return;
        }
        
        
        try
        {
            /** @todo
             * On application start (at the myazure-idsrv level),
             * open an application wide connection pool.
             * 
             * From controllers, spawn new requests from the pool.
             * 
             * In other words, this needs to move out of here
             * and it instead needs to happen
             */
            await pool.connect();
            console.log("connected to DB.");
        }
        catch (dbError)
        {
            console.log(dbError);
            console.log("could not connect to DB.");
        }

        const { first_name, last_name, email, username, password } = req.body;
        /** @todo add security against potential SQL injection */
        console.log("building query...");
        const userInsertQuery = `
            INSERT INTO Users (first_name, last_name, email, username, password)
            VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${password}')
        `;

        let result;
        console.log("querying to DB...");
        try
        {
            console.log("inserting User...");
            result = await pool.query(userInsertQuery);

            let msg = "User successfully created.";
            console.log(msg);
            console.log(result);
            res.status(200).json({ msg })
        }
        catch (error) {
            let msg = "An error occurred while trying to create new user.";
            console.log(msg);
            console.log(error);

            res.status(500).json({ msg });
        }
        finally
        {
            pool.close();
            console.log("DB connection closed.");
        }

    } // end of createUser

}
