var DataService = require('../dataService');

class IngredientService extends DataService {

    constructor(Models, Validator) {
        super(Models, Validator);
    }


    async createItem(data) {
        return super.createItem(data, this._Models.ingredient);
    }

    async getAll() {
        try {
            return super.getAll(this._Models.ingredient);
        } catch {
            return {error: "Could not fetch the ingredients"};
        }
    }

}

module.exports = IngredientService;