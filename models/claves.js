var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var claveSchema = new Schema({

    e: { type: String},
    n: { type: String},
    d: { type: String},
    valor: {type: Number}

});
// export
module.exports = mongoose.model('Clave', claveSchema);