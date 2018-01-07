var express = require('express');
var router = express.Router();
var User = require('../models/usuario');
var bcrypt = require('bcryptjs');

module.exports = router;


router.post('/', function (req, res) {

    var admin = new User();
    var params = req.body;
    admin = params;

    if(params.usuario && params.password){
        admin.usuario = params.usuario;
        admin.password = params.password;
        bcrypt.hash(params.password, 10, function (err, hash) {
            admin.password = hash;
            User.create(admin, function (err, user) {
                if (err) return next(err);
                res.json(user);
            });
        })
    }
});

router.post('/login', function(req, res) {

    var params = req.body;
    var usuario = params.usuario;
    var password = params.password;

   User.findOne({usuario: usuario}).exec(function (err, user) {
        if (err) {
            res.status(500).send({message: 'Error al iniciar sesión'})
        }else{
            if(user){
                console.log(password);
                console.log(user);
                bcrypt.compare(password, user.password ,function(err, check){
                    if(check){
                        res.status(200).jsonp(user);
                    }else{
                        res.status(404).send({message: 'Contraseña incorrecta'})
                    }
                })
            }else{
                res.status(404).send({message: 'Usuario incorrecto'});
            }
        }
    });
});

router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findById(req.params.id).exec(function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

router.put('/credito/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id, { $set: { 'credito': req.body.credito} }).exec(function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});