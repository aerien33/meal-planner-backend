var Models = require('../model/allModels');
var DataService = require('../service/dataService');

class ServiceFacade {

    static instance;

    #Models;
    #Service;

    constructor() {
        if (this.constructor.instance) {
           return this.constructor.instance;
       } else {
           this.#Models = new Models();
           this.#Service = new DataService(this.#Models);
           this.constructor.instance = this;
       }
    }



    async createIngredient(data) {
        return this.#Service.saveItem(null, data, this.#Models.ingredient);
    }

    async createType(data) {
        return this.#Service.saveItem(null, data, this.#Models.type);
    }

    async createMeal(data) {
        return this.#Service.saveItem(null, data, this.#Models.meal);
    }

    async getAllIngredients() {
        return this.#Service.getAll(this.#Models.ingredient);
    }

    async getAllTypes() {
        return this.#Service.getAll(this.#Models.type);
    }

    async getAllMeals() {
        return this.#Models.meal.find({}, '-__v')
            .populate({path:'ingredients', model:'Ingredient', select:'-__v'})
            .populate({path:'type', model:'Type', select:'-__v'});
    }

    async getIngredients(filter) {
        return this.#Service.getItems(filter, this.#Models.ingredient);
    }

    async getTypes(filter) {
        return this.#Service.getItems(filter, this.#Models.type);
    }

    async getMeals(filter) {
        return this.#Service.getItems(filter, this.#Models.meal);
    }

    async getOneIngredient(filter) {
        return this.#Service.getItemByFilter(filter, this.#Models.ingredient);
    }

    async getOneType(filter) {
        return this.#Service.getItemByFilter(filter, this.#Models.type);
    }

    async getOneMeal(filter) {
        return this.#Service.getItemByFilter(filter, this.#Models.meal);
    }

    async getOneIngredientByTitle(title) {
        return this.#Service.getItemByTitle(title, this.#Models.ingredient);
    }

    async getOneTypeByTitle(title) {
        return this.#Service.getItemByTitle(title, this.#Models.type);
    }

    async getOneMealByTitle(title) {
        return this.#Service.getItemByTitle(title, this.#Models.meal);
    }

    async updateIngredient(id, data) {
        return this.#Service.saveItem(id, data, this.#Models.ingredient);
    }

    async updateType(id, data) {
        return this.#Service.saveItem(id, data, this.#Models.type);
    }

    async deleteIngredient(id) {
        return this.#Service.deleteItem(id, this.#Models.ingredient);
    }

    async deleteType(id) {
        return this.#Service.deleteItem(id, this.#Models.type);
    }

    async requestDeleteManyIng(filter) {
        return this.#Service.requestDeleteMany(filter, this.#Models.ingredient);
    }

    async requestDeleteManyTypes(filter) {
        return this.#Service.requestDeleteMany(filter, this.#Models.type);
    }

    async deleteManyIngredients(filter) {
        return this.#Service.deleteMany(filter, this.#Models.ingredient);
    }

    async deleteManyTypes(filter) {
        return this.#Service.deleteMany(filter, this.#Models.type);
    }

    async deleteAllIngredients() {
        return this.#Service.deleteMany({}, this.#Models.ingredient);
    }

    async deleteAllTypes() {
        return this.#Service.deleteMany({}, this.#Models.type);
    }

    async deleteAllMeals() {
        return this.#Service.deleteMany({}, this.#Models.meal);
    }

    async requestFormat() {
        return this.#Service.requestFormat();
    }

    async fullFormat() {
        return this.#Service.fullFormat();
    }

}

module.exports = ServiceFacade;