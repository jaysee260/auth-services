const app = require("express")();
const { name:projName = "Server" } = require("./package.json");
const { PORT = 3000 } = process.env;
const jwt = require("jsonwebtoken");
const { dbConnection, checkWhitelist } = require("./checkWhitelist");

app.get("/", (req, res) => {
    res.status(200).send(true);
});

app.get("/api/jwt-factory", checkWhitelist, (req, res) => {
    const {
        issuer,
        subject,
        jwtid,
        secret,
        expiresIn
     } = require("./config").jwt;
    /** @todo make it so that not just anyone can get a token */
    let payload = Date.now();
    let token = jwt.sign({ payload }, secret, { issuer, subject, jwtid, expiresIn });

    const msg = "This is where you can get a JWT.";
    res.status(200).send({ msg, token });
});

app.listen(PORT, () => {
    console.log("%s running and listening on port %s", projName, PORT);
})