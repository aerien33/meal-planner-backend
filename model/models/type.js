var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Type of meal, such as breakfast, lunch, dinner etc.
var type = new Schema({
    title: {type: String, required: true},
    defaultOrder: {type: Number, required: true}
});

type.methods.saveAs = function(data) {

    this.title = data.title;

    if (!(data.defaultOrder > 0)) {
        return {error:"Default order needs to be greater than 0"};
    } else {
        this.defaultOrder = data.defaultOrder;
    }

    this.save();
    return this;
};

module.exports = mongoose.model('Type', type);