function settings(verb = "GET", token = null, data = null) {
    const httpVerbs = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    
    verb = verb.toUpperCase();
    if ( !httpVerbs.includes(verb) )
        verb = httpVerbs[0];

	let reqSettings = {
        method: verb,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
    };

    if (token) {
        const whitespace = new RegExp("\\s", "g");
        const noSpace = "";
        if ( whitespace.test(token) ) 
            token = token.replace(whitespace, noSpace);
        
        reqSettings.headers["Authentication"] = "Bearer " + token
    }

    if (data) {
        reqSettings["body"] = JSON.stringify(data);
    }

    return reqSettings;
}

const baseUrl = "/api/user-registration";

exports.createUser = (payload) => 
    fetch(baseUrl, settings("post", null, payload));