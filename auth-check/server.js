const app = require("express")();
const { PORT = 3000 } = process.env;
const jwt = require("jsonwebtoken");
const authCheck = require("./authCheck");

app.get("/", (req, res) => {
    res.status(200).send(true);
});

app.get("/api/public", (req, res) => {
    const msg = "This is a public route; you DO NOT need permission to access it.";
    res.status(200).send(msg);
});

app.get("/api/private", authCheck, (req, res) => {
    const msg = "You've reached a private route.";
    console.log("This is the token: " + req.token);
    
    res.status(200).send(msg)
});

app.listen(PORT, () => {
    console.log("Server running and listening on port %s", PORT);
})