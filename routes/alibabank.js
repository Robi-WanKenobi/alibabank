var express = require('express');
var router = express.Router();
var serverKeys = require('../services/server_keys.js');
var blindSignature = require('../services/blind_signature.js');
var nonRepudiation = require('../services/non_repudiation.js');
var sharedSecret = require('../services/shared_secret.js');
var Key = require('../models/claves');
var bigInt = require("big-integer");


/* Get Server Keys */
router.get('/', function(req, res) {
    var public_exp = serverKeys.e;
    var public_module = serverKeys.n;
    var id_server = serverKeys.id_server;
    res.status(200).send(JSON.stringify({ e: public_exp, n:  public_module, id: id_server }));
});

router.post('/sign', function(req, res) {
    var id_server = serverKeys.id_server;
    var id_client = req.body[0].A;
    var moneda = req.body[2].coin;
    var cantidad = req.body[3].cantidad;
    console.log('Firma ciega');

    Key.find({"valor": cantidad}, function (err, clave) {
        if (err) return next(err);
        d = clave[0].d;
        n = clave[0].n;
        var signed = bigInt(moneda).modPow(d, n);
        console.log('Mensaje firmado en la api: ' + signed);
        var data = ([{"A": id_server}, {"B": id_client}, {"coin_signed": signed}, {'cantidad': cantidad}]);
        var Po = nonRepudiation.gethash(data);
        var response = ([{"A": id_server}, {"B": id_client}, {"signed": signed}, {'cantidad': cantidad}, {'Po': Po}, {'status': "Mensaje firmado"}]);
        res.status(200).send(response);
    });

});

router.post('/set_secret', function (req, res) {
    console.log(req.body);
    var id_server = serverKeys.id_server;
    var id_client = req.body[0].A;
    var secret = req.body[2].cipher;
    var share = sharedSecret.divide_secret(secret);
    console.log(share);
    res.status(200).send([{"B": id_server}, {"A": id_client}, {"share": share}]);
});

module.exports = router;