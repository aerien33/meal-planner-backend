var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var meal = new Schema({
    title: {type: String, required: true, unique: true},
    ingredients: {
        type: [ObjectId],
        ref: 'Ingredient',
        validate: v => Array.isArray(v) && v.length > 0
    },
    recipe: {
        type: [String],
        validate: v => Array.isArray(v) && v.length > 0
    },
    type: {type: ObjectId, ref: 'Type', required: true},
    currentOrder: {type: Number, required: true}
});

module.exports = mongoose.model('Meal', meal);