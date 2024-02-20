var Ingredient = require('./models/ingredient');
var Type = require('./models/type');
var Meal = require('./models/meal');

class AllModels {

    #Ingredient;
    #Type;
    #Meal;

    constructor() {
        this.#Ingredient = Ingredient;
        this.#Type = Type;
        this.#Meal = Meal;
    }

    get ingredient() {
        return this.#Ingredient;
    }

    get type() {
        return this.#Type;
    }

    get meal() {
        return this.#Meal;
    }

}

module.exports = AllModels;