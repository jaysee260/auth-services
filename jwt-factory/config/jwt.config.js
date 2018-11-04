module.exports = {
    issuer: "api/auth/jwt-factory",
    subject: "test_subject123",
    jwtid: "subject's unique id or something",
    secret: "abracadabra",
    expiresIn: 30   // expressed in seconds or a string describing a time span zeit/ms. 
}

/**
 * subject and jwtid cannot go in this file.
 * they need to be pulled from DB.
 */