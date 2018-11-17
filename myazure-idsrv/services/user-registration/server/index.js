"use strict";

const app = require("express")();
const bodyParser = require("body-parser");
const { name } = require("../package.json");
const PORT = 3000;
const { userController } = require("./routes/controllers/userController");

const { pool } = require("../utils/db");

app.route("/api/user-registration")
    .post(userController.createUser);

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, async () => {
    console.log("%s running on port %s", name, PORT);
    try
    {
        await pool.connect();
        console.log("Connected to DB.");
    }
    catch (dbConnectionError)
    {
        console.log("Failed to connect to DB.");
        console.log(dbConnectionError);
    }
});