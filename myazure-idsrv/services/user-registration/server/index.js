(async (process) => {
    "use strict";

    const app = require("express")();
    const { name : serviceName } = require("../package.json");
    const { PORT = 3000 } = process.env;

    // The application should have these things
    // set up before it opens its gates to the world.

    // Middleware Registration
    await (function registerMiddleWare(app) {
        const bodyParser = require("body-parser");

        app.use(bodyParser.json());                                     
        app.use(bodyParser.urlencoded({ extended: true }));
    })(app);


    // Routes Registration
    await (function registerRoutes(app) {
        const { userController } = require("./routes/controllers/userController");

        app.route("/api/user-registration")
            .post(userController.createUser);

    })(app);


    // Database Initialization
    await (async function establishDatabaseConnection() {
        const { pool } = require("../utils/db");

        // Service spawns its own connection pool.
        try
        {
            await pool.connect();
            console.log("Connected to DB.");
        }
        catch (dbConnectionError)
        {
            console.log("Failed to connect to DB.");
            console.log(dbConnectionError);

            console.log("Will not even attempt to start service.");
            console.log("Process ending now with exit code 1.");
            process.exit(1);
        }

    })();


    app.listen(PORT, async () => {
        console.log("%s running on port %s", serviceName, PORT);
    });
})(process)