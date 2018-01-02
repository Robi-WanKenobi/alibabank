var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    nombre: {type: String},
    usuario: { type: String},
    password: { type: String},
    credito: {type: Number, default: 0}

});
// export
module.exports = mongoose.model('Usuario', usuarioSchema);