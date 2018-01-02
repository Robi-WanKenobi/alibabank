var bigInt = require("big-integer");
var serverKeys = require('../services/server_keys.js');

var d = serverKeys.d;
var n = serverKeys.n;

exports.sign = function(mensaje) {
    console.log('Firma ciega');
    console.log(mensaje);
    var signed = bigInt(mensaje).modPow(d, n);

    console.log("Mensaje firmado: " + signed.toString());
    return signed;
};