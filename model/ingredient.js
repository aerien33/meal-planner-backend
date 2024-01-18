var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    unit: {type: String, required: true}
});

module.exports = mongoose.model('Ingredient', ingredient);