const app = require("express")();
const { PORT = 3000 } = process.env;
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
    res.status(200).send(true);
});

app.get("/api/auth/jwt-factory", (req, res) => {
    const {
        issuer,
        subject,
        jwtid,
        secret,
        expiresIn
     } = require("./config/jwt.config");
    /** @todo make it so that not just anyone can get a token */
    let payload = Date.now();
    let token = jwt.sign({ payload }, secret, { issuer, subject, jwtid, expiresIn });

    const msg = "This is where you can get a JWT.";
    res.status(200).send({ msg, token });
});

app.listen(PORT, () => {
    console.log("Server running and listening on port %s", PORT);
})