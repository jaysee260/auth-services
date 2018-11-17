"use strict";

const app = require("express")();
const { name : serviceName } = require("../package.json");
const { PORT = 3000 } = process.env;

// The application should have these things
// set up before it opens its gates to the world.

// Middleware Registration
(function registerMiddleWare(app) {
    const bodyParser = require("body-parser");
    
    app.use(bodyParser.json());                                     
    app.use(bodyParser.urlencoded({ extended: true }));
})(app);

// Routes Registration
(function registerRoutes(app) {
    const { checkWhitelist } = require("../utils/auth");
    const { healthCheckController } = require("./routes/controllers/healthCheckController");
    const { jwtFactoryController } = require("./routes/controllers/jwtFactoryController");
    
    // Service health check endpoint
    app.route("/api/jwt-factory/health")
    .get(healthCheckController);
    
    app.route("/api/jwt-factory")
    .post(checkWhitelist, jwtFactoryController.issueToken)
    
})(app);

// Database Initialization
(async function establishDatabaseConnection() {
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


// Start Service
app.listen(PORT, () => {
    console.log("%s running and listening on port %s", serviceName, PORT);
})
