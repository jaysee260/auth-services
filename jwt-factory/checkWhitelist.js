const { db } = require("./config");
const Sequelize = require("sequelize");
const dbConnection = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    dialect: db.dialect["mssql"],
    dialectOptions: {
        encrypt: true
    },
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

function checkWhitelist(req, res, next) {
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

module.exports = {
    dbConnection,
    checkWhitelist
}

