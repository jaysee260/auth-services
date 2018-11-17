const { dbConnection } = require("../../../../../utils/db");

exports.userController = {
    createUser: function(req, res, next) {
        console.log("createsUser route");
        /** @todo insert user into Users table */
        /** @todo verify user's email is added to whitespace
         * after insertion into User's table.
         */
        dbConnection.authenticate()
            .then(() => {
                // do DB things.
                console.log("DB connection successfull.");
                
                console.log("Building query...");
                const { first_name, last_name, email, username, password } = req.body;
                const query = `
                    INSERT INTO Users (first_name, last_name, email, username, password)
                    VALUES ('${first_name}', '${last_name}', '${email}', '${username}', '${password}')
                `;

                console.log("querying to DB...");
                console.log("inserting User...");
                dbConnection.query(query).spread((results, metadata) => {

                    console.log("closing DB connection");
                    dbConnection.close()
                        .then(() => {
                            console.log("DB connection closed.");
                            console.log({ results });
                            if (results.length === 1) {
                                console.log(results);
                                let msg = "User created successfully";
                                res.status(200).json({ msg, results });
                            } else {
                               let msg = "Something went wrong when trying to create User.";
                               res.status(505).json({ msg }); 
                            }
                        })
                        .catch((error) => {
                            console.log("Could not close DB connection...");
                            console.log(error);
                            res.status(505).send("Something went wrong.");
                        })

                });
            })
            .catch((error) => {
                console.log("Could not close DB connection...");
                console.log(error);
                res.status(505).send("Something went wrong.");
            })
        
    }
}