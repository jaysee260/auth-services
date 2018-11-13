const { dbConnection } = require("../../../../../utils/db");

exports.userController = {
    createUser: function(req, res) {
        console.log("createsUser route");

        dbConnection.authenticate()
            .then(() => {
                // do DB things.
                console.log("DB connection successfull.");
                res.status(200).json({ body: req.body });
            })
            .catch((error) => {
                console.log("Could not close DB connection...");
                console.log(error);
                res.status(505).send("Something went wrong.");
            })
        
    }
}