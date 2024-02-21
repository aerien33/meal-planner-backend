
class jsonValidator {

    #Models;

    constructor(Models) {
        this.#Models = Models;
    }

    validateFormat(data, item) {
        if (item instanceof this.#Models.ingredient) {
            return this.#validateIngredient(data);
        } else if (item instanceof this.#Models.type) {
            return this.#validateType(data);
        } else if (item instanceof this.#Models.meal) {
            return this.#validateMeal(data);
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

    #validateMeal(data) {
        if (!data.title || data.title === "") {
            return {error:"Please provide the title of the meal"};
        } else if (!data.ingredients || !Array.isArray(data.ingredients) || data.ingredients.length == 0) {
            return {error:"Please provide the ingredients in an array"};
        } else if (!data.recipe || !Array.isArray(data.recipe) || data.recipe.length == 0) {
            return {error:"Please provide the recipe in an array of strings"};
        } else if (!data.typeTitle || data.typeTitle === "") {
            return {error:"Please provide the title of the type of meal"};
        } else {

            for (const ing of data.ingredients) {
                const ingredient = this.#validateIngredient(ing);
                if (ingredient.error) {
                    return ingredient;
                }
            }

            for (const step of data.recipe) {
                if (typeof step !== 'string') {
                    return {error:"Please provide the recipe in an array of strings"};
                }
            }

            return data;
        }
    }

}

module.exports = jsonValidator;