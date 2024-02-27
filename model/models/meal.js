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
    currentOrder: {type: Number, min: 1, required: true}
});



meal.statics.isTitleUnique = async function(title) {
    const item = await this.findOne({"title":title});

    if (item != null) {
        return false;
    } else {
        return true;
    }
}

meal.statics.saveAs = async function(data, item) {

    const unique = await this.isTitleUnique(data.title);
    if (unique == false) {
        return {error:"There is already a meal with this title"};
    } else {
        item.title = data.title;
    }

    if (!(data.ingredients.length > 0)) {
        return {error:"Could not assign any ingredient ID to the meal"};
    } else {
        item.ingredients = data.ingredients;
    }

    if (!(data.recipe.length > 0)) {
        return {error:"Could not assign any recipe step to the meal"};
    } else {
        item.recipe = data.recipe;
    }

    item.type = data.type;

    if (data.currentOrder < 1) {
        return {error:"Current order needs to be at least 1"};
    } else {
        item.currentOrder = data.currentOrder;
    }

    item.save();
    return item;
};

module.exports = mongoose.model('Meal', meal);