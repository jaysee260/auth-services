

exports.registerMiddleware = function (app) {

    const bodyParser = require("body-parser");
    const logger = require("morgan");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(logger("dev"));
}

exports.registerRoutes = function (app) {
    // import from routes/index.js
    app.route("/api/myazure-idsrv/health")
    .get((req, res) => {
        res.status(200).send(true);
    });
}

exports.registerMiddlewareAsync = async function (app) {

    const bodyParser = require("body-parser");
    const logger = require("morgan");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(logger("dev"));

    return true;
}

exports.registerRoutesAsync = async function (app) {
    
    app.route("/api/myazure-idsrv/health")
    .get((req, res) => {
        res.status(200).send(true);
    });

    return true;
}