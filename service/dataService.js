
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

    async getAllIngredients() {
        return this.getAll(this._Models.ingredient);
    }

    async getAllTypes() {
        return this.getAll(this._Models.type);
    }

    async findIngredients(filter) {
        return this.findItems(filter, this._Models.ingredient);
    }

    async findTypes(filter) {
        return this.findItems(filter, this._Models.type);
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


    async getAll(Model) {
        try {
            return Model.find();
        } catch {
            return {error: "Could not fetch the items"};
        }
    }


    async findItems(filter, Model) {
         try {
             const items = await Model.find(filter);

             if(!Array.isArray(items)) {
                 return {error:"Could not fetch the array of items matching this filter criteria"};
             } else if (!items.length) {
                 return {error:"There are no items matching this filter criteria"};
             } else {
                 return items;
             }

         } catch {
             return {error:"Could not fetch items matching this filter criteria"};
         }
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