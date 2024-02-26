
class Mapper {

    #Models;
    #Service;

    constructor(Models, DataService) {
        this.#Models = Models;
        this.#Service = DataService;
    }


    async mapToItem(data, item) {
        try {
            if (item instanceof this.#Models.meal) {
                return this.mapToMeal(data);
            } else {
                return data;
            }
        } catch {
            return {error: "Could not map the data to a given item"};
        }
    }


    async mapToMeal(data) {
        try {
            const meal = await this.#Service.createItem(this.#Models.meal);
            meal.title = data.title;

            var ingredientIDs = [];
            for (const ing of data.ingredients) {
                let ingredient = await this.#Service.getItemToSave(ing, this.#Models.ingredient);
                if (ingredient.error) {
                    return ingredient;
                } else if (!ingredient.title) {
                    const saved = this.#Service.saveItem(ingredient._id, ing, this.#Models.ingredient);
                    ingredientIDs.push(saved._id);
                } else {
                    ingredientIDs.push(ingredient._id);
                }
            }

            meal.ingredients = ingredientIDs;

            meal.recipe = data.recipe;

            const type = await this.#Service.getItemByTitle(data.typeTitle, this.#Models.type);
            if (type.error) {
                return type;
            } else {
                meal.type = type._id;
            }

            if (!data.currentOrder) {
                meal.currentOrder = type.defaultOrder;
            } else {
                meal.currentOrder = data.currentOrder;
            }

            return meal;

        } catch {
            return {error: "Could not map the data to a meal"};
        }

    }

}

module.exports = Mapper;