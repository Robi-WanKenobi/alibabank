var secrets = require('secrets.js');

exports.divide_secret = function (key) {
    console.log('Fragmentar clave:' +key);
    var secret = key.toString(16);
    var shares = secrets.share(secret, 3, 3, 16);
    s1 = shares[0];
    s2 = shares[1];
    s3 = shares[2];
    console.log('Secret_1: ' + s1);
    console.log('Secret_2: ' + s2);
    console.log('Secret_3: ' + s3);
    return s1;
};