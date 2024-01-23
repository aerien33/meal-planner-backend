var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    unit: {type: String, required: true}
});

ingredient.methods.saveAs = function(data) {
    
    this.title = data.title;
    
    if (!(data.quantity > 0)) {
        return {error:"Quantity needs to be greater than 0"};
    } else {
        this.quantity = data.quantity;
    }
    
    this.unit = data.unit;
    
    this.save();
    return this;
};

module.exports = mongoose.model('Ingredient', ingredient);