const app = require("express")();
const { PORT = 3000 } = process.env;

const {
    registerMiddleware,
    registerRoutes
} = require("../utils/startup")

registerMiddleware(app);
registerRoutes(app);

app.listen(PORT, () => {
    const { name } = require("../package.json");
    var pid =  "Process with PID " + process.pid;

    console.log("%s running on port %s", name || pid, PORT);
});
