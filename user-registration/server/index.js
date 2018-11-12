const app = require("express")();
const bodyParser = require("body-parser");
const { name } = require("../package.json");
const PORT = 3000;
const { userController } = require("./routes/controllers/userController");

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/api/user-registration")
    .post(userController.createUser)

app.listen(PORT, () => {
    console.log("%s running on port %s", name, PORT);
})