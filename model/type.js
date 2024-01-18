var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Type of meal, such as breakfast, lunch, dinner etc.
var type = new Schema({
    title: {type: String, required: true, unique: true},
    defaultOrder: {type: Number, required: true}
});

module.exports = mongoose.model('Type', type);