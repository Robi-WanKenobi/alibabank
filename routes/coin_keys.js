var express = require('express');
var router = express.Router();
var serverKeys = require('../services/server_keys.js');
var Key = require('../models/claves');

//Hay claves para 1,2,5,10,20,50,100,200,500

router.post('/gen_key/:value', function (req, res) {

    serverKeys.generate_server_keys();
    Key.create({"e": serverKeys.e, "n": serverKeys.n, "d": serverKeys.d, "valor": req.params.value}, function (err, clave) {
        if (err) return next(err);
        res.json(clave);
    });
});

module.exports = router;

