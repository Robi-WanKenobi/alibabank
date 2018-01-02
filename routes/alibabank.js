var express = require('express');
var router = express.Router();
var serverKeys = require('../services/server_keys.js');
var blindSignature = require('../services/blind_signature.js');
var nonRepudiation = require('../services/non_repudiation.js');
var sharedSecret = require('../services/shared_secret.js');

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
    var cantidad = req.body[3].cantidad;
    var signed = blindSignature.sign(req.body[2].cipher);
    var data = ([{"B": id_server}, {"A": id_client}, {"signed": signed}, {'cantidad': cantidad}]);
    var Po = nonRepudiation.gethash(data);
    var response = ([{"B": id_server}, {"A": id_client}, {"signed": signed}, {'cantidad': cantidad}, {'Po': Po}, {'status': "Mensaje firmado"}]);
    res.status(200).send(response);
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