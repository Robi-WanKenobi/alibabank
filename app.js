var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serverKeys = require('./services/server_keys.js');

mongoose.connect('mongodb://localhost/alibabank', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});


serverKeys.generate_server_keys();

var alibabank = require('./routes/alibabank');
var coin_keys = require('./routes/coin_keys');
var usuarios = require('./routes/usuarios');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
    /*var allowedOrigins = ['http://127.0.0.1:8100', 'http://localhost:8100'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }*/
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use('/alibabank', alibabank);
app.use('/coin', coin_keys);
app.use('/usuario', usuarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;