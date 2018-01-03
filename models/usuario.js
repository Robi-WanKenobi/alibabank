var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    nombre: {type: String},
    email: {type: String},
    dni: {type: String},
    usuario: { type: String},
    password: { type: String},
    credito: {type: Number, default: 10000}

});
// export
module.exports = mongoose.model('Usuario', usuarioSchema);