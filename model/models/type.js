var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Type of meal, such as breakfast, lunch, dinner etc.
var type = new Schema({
    title: {type: String, required: true, unique: true},
    defaultOrder: {type: Number, required: true}
});

type.statics.isTitleUnique = async function(title) {
    const item = await this.findOne({"title":title});

    if (item != null) {
        return false;
    } else {
        return true;
    }
}

type.methods.saveAs = async function(data) {

    const unique = await this.constructor.isTitleUnique(data.title);
    if (unique == false) {
        return {error:"There is already a type with this title"};
    } else {
        this.title = data.title;
    }

    if (!(data.defaultOrder > 0)) {
        return {error:"Default order needs to be greater than 0"};
    } else {
        this.defaultOrder = data.defaultOrder;
    }

    this.save();
    return this;
};

module.exports = mongoose.model('Type', type);