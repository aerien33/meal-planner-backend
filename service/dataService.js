
// Abstract Class
class DataService {

    _Models;
    #Validator;

    constructor(Models, Validator) {
        this._Models = Models;
        this.#Validator = Validator;
    }


    //Simple API
    async createIngredient(data) {
        return this.createItem(data, this._Models.ingredient);
    }

    async createType(data) {
        return this.createItem(data, this._Models.type);
    }



    //Template methods
     async createItem(data, Model) {
        try {
            const item = await this.createModel(Model);
            const valid = this.validateItem(data, item);

            if (valid.error) {
                return valid;
            } else {
                const saved = this.saveItem(valid, item);
                return saved;
            }

        } catch {
            return {error: "Could not save the item"};
        }
    }


    async getAll() {
        throw new Error("Method 'getAll()' must be implemented.");
    }


    async getSelected(filter) {
         throw new Error("Method 'getSelected(filter)' must be implemented.");
    }


    async updateItem(id) {
         throw new Error("Method 'update(id)' must be implemented.");
    }


    async deleteItem(id) {
         throw new Error("Method 'delete(id)' must be implemented.");
    }



    //Supporting methods
    async createModel(Model) {
        try {
            return new Model();
        } catch {
            return {error: "Could not create the model"};
        }
    }

    validateItem(data, item) {
        return this.#Validator.validateItem(data, item);
    }

    saveItem(data, item) {
        return item.saveAs(data);
    }

    getID(item) {
         return item._id;
    }

    getIDs(items) {
        let IDs = [];
        items.map(item => IDs.push(item._id));
        return IDs;
    }

}

module.exports = DataService;