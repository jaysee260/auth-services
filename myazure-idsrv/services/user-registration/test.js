(async () => {
    const { hashPassword, passwordAndHashMatch } = require("./utils/auth");

    var hash = await hashPassword("myname");
    console.log(hash);

})()