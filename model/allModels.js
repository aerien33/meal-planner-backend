var Ingredient = require('./models/ingredient');
var Type = require('./models/type');

class AllModels {

    #Ingredient;
    #Type;

    constructor() {
        this.#Ingredient = Ingredient;
        this.#Type = Type;
    }

    get ingredient() {
        return this.#Ingredient;
    }

    get type() {
        return this.#Type;
    }

}

module.exports = AllModels;