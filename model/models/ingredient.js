var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
    title: {type: String, required: true},
    quantity: {type: Number, min: 0.01, required: true},
    unit: {type: String, required: true}
});

ingredient.statics.saveAs = function(data, item) {
    
    item.title = data.title;
    
    if (data.quantity < 0.01) {
        return {error:"Quantity needs to be at least 0.01"};
    } else {
        item.quantity = data.quantity;
    }
    
    item.unit = data.unit;
    
    item.save();
    return item;
};

module.exports = mongoose.model('Ingredient', ingredient);