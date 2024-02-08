var Ingredient = require('../model/ingredient');
var Type = require('../model/type');

class ModelFactory {

    async createModel(model) {
        try {
            if (model === "ingredient") {
                return new Ingredient();
            } else if (model === "type") {
                return new Type();
            } else {
                return {error: "Could not create an unknown model"};
            }

        } catch {
            return {error: "Could not create the model"};
        }
    }
}

module.exports = ModelFactory;