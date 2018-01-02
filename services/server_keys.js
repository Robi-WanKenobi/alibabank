var bigInt = require("big-integer");

//Generamos todos los valores cuando se arranca el servidor
var length = 512;
var p, q, n, phiN, e, d;
var id_server = "Alibabank";
exports.id_server = id_server;


exports.generate_server_keys = function () {
    p = bigInt.randBetween(bigInt(2).pow((length/2) - 1), bigInt(bigInt(2).pow(length/2)).minus(1));
    q = bigInt.randBetween(bigInt(2).pow((length/2) - 1), bigInt(bigInt(2).pow(length/2)).minus(1));

    while (!bigInt(p).isPrime()){
        p = bigInt.randBetween(bigInt(2).pow((length/2) - 1), bigInt(bigInt(2).pow(length/2)).minus(1));
    }

    while (!bigInt(q).isPrime()){
        q = bigInt.randBetween(bigInt(2).pow((length/2) - 1), bigInt(bigInt(2).pow(length/2)).minus(1));
    }

//n = p·q y phiN es (p-1)(q-1)
    n = bigInt(p).multiply(q);
    phiN = bigInt(bigInt(p).prev()).multiply(bigInt(q).prev());

//Random menor que Phi de N
    e = bigInt.randBetween((bigInt(2).pow(length/2)), bigInt(phiN));


//Mientras e no sea primo y coprimo de phiN lo volvemos a generar
    while ((!bigInt(e).isPrime())&&(bigInt.lcm(e, phiN) != 1)){
        e = bigInt.randBetween((bigInt(2).pow(length/2)), bigInt(phiN));
    }

//d (exponente privado) tiene que ser el multiplicador inverso de e mod phiN
    d = bigInt(e).modInv(phiN);

    exports.d = d;
    exports.e = e;
    exports.n = n;
};