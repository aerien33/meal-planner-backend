var DataService = require('../dataService');
var Ingredient = require('../../model/ingredient');

class IngredientService extends DataService {

    constructor(validator) {
        super(validator);
    }

    async createModel() {
        return new Ingredient();
    }

}

module.exports = IngredientService;