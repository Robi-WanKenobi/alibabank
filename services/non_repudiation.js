var bigInt = require("big-integer");
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

exports.gethash = function(data) {
    console.log('No repudio para:');
    console.log(data);
    var norep = CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
    console.log("Hash: " + norep);
    return norep;
};