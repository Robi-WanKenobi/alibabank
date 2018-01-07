var bigInt = require("big-integer");
var serverKeys = require('../services/server_keys.js');
var Key = require('../models/claves');


var d, n;

exports.sign = function(mensaje, cantidad) {
    console.log('Firma ciega');
    Key.find({"valor": cantidad}, function (err, clave) {
        if (err) return next(err);
        d = clave[0].d;
        n = clave[0].n;
        var signed = bigInt(mensaje).modPow(d, n);
        console.log("Mensaje firmado en módulo: " + signed.toString());
        if (signed){
        return signed;
        }
    });
};