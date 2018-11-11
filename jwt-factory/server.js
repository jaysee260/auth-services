const app = require("express")();
const { name:projName = "Server" } = require("./package.json");
const { PORT = 3000 } = process.env;
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
    res.status(200).send(true);
});

app.get("/api/auth/jwt-factory/token/request", (req, res) => {
    const msg = "This is where you would submit a request to get a JWT. " +
                "If all conditions (TBD) are met and your request is processed " +
                "successfully, you'll be issued a claim number. You will then be " +
                "redirected to the endpoint where you can claim your JWT.";
    /** @todo
     * Determine what conditions need to be met
     * in order for someone to receive a claim number.
     */
    /** @todo
     * when entry is entered into whitelist,
     * generate a random numeric code for
     * verification purposes when claiming token
     */
    res.status(200).send(msg);
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

app.get("/route1", (req, res) => {
    console.log("passing through route1...");
    res.redirect("/route2/" + "12345");
});

app.get("/route2/:claim", (req, res) => {
    console.log("reached route2...");
    console.log(req.params.claim);
    res.send("hi from route2.");
    
});

app.listen(PORT, () => {
    console.log("%s running and listening on port %s", projName, PORT);
})