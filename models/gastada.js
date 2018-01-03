var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gastadaSchema = new Schema({

    id_anonycoin: { type: String}

});
// export
module.exports = mongoose.model('Gastada', gastadaSchema);