
exports.hashPassword = function (plainTextPassword = null, saltRounds = 8) {
    if (!plainTextPassword) return;

    const { hash } = require('bcryptjs');
    return hash(plainTextPassword, saltRounds);
}

exports.passwordAndHashMatch = function(plainTextPassword = null, hash = null) {
    if ( !plainTextPassword || !hash ) return;

    const { compare } = require("bcryptjs");
    return compare(plainTextPassword, hash);
}