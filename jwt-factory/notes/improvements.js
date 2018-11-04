// version 1
function settings(verb = "get", token) {
    return {
        method: verb.toUpperCase(),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authentication": "Bearer " + token,
        }
    }
}

// version 2
function settings(verb = "GET", token) {
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

    return reqSettings;
}