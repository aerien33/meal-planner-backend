var Ingredient = require('../model/ingredient');
var Type = require('../model/type');

class jsonValidator {

    validateItem(data, item) {
        if (item instanceof Ingredient) {
            return this.#validateIngredient(data);
        } else if (item instanceof Type) {
            return this.#validateType(data);
        } else {
            return {error:"Validation of this model is not supported"};
        }
    }
    
    #validateIngredient(data) {
        if (!data.title || data.title === "") {
            return {error:"Please provide the title for the ingredient"};
        } else if (!data.quantity || typeof data.quantity !== 'number') {
            return {error:"Please provide the quantity for the ingredient as a number"};
        } else if (!data.unit || data.unit === "") {
            return {error:"Please provide the unit of the ingredient"};
        } else {
            return data;
        }
    }

    #validateType(data) {
        if (!data.title || data.title === "") {
            return {error:"Please provide the title for the type of meal"};
        } else if (!data.defaultOrder || typeof data.defaultOrder !== 'number') {
            return {error:"Please provide default order of this type of meal as a number"};
        } else {
            return data;
        }
    }

}

module.exports = jsonValidator;