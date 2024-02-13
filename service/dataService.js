
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
        return this.saveItem(null, data, this._Models.ingredient);
    }

    async createType(data) {
        return this.saveItem(null, data, this._Models.type);
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

    async updateIngredient(id, data) {
        return this.saveItem(id, data, this._Models.ingredient);
    }

    async updateType(id, data) {
        return this.saveItem(id, data, this._Models.type);
    }



    //Template methods
    async saveItem(id, data, Model) {
        try {
            const item = await this.getItemToSave(id, Model);

            if (item.error) {
                return item;
            } else {
                const valid = this.validateItem(data, item);

                if (valid.error) {
                    return valid;
                } else {
                    const saved = this.saveToDatabase(valid, item);
                    return saved;
                }
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


    async deleteItem(id) {
         throw new Error("Method 'delete(id)' must be implemented.");
    }



    //Supporting methods
    async createItem(Model) {
        try {
            const item = await new Model();

            if (item == null) {
                return {error: "Could not create the instance of this model"};
            } else {
                return item;
            }

        } catch {
            return {error: "Could not create the instance of this model"};
        }
    }

    async getItemToSave(id, Model) {
        try {
            if (!id) {
                return this.createItem(Model);
            } else {
                return this.findItemByID(id, Model);
            }
        } catch {
            return {error: "Could not get the item which will be saved"};
        }
    }

    validateItem(data, item) {
        return this.#Validator.validateItem(data, item);
    }

    saveToDatabase(data, item) {
        return item.saveAs(data);
    }

    async findItemByID(id, Model) {
        try {
            const item = await Model.findById(id);

            if (item == null) {
                return {error: "Could not find any item with this ID"}
            } else {
                return item;
            }

        } catch {
            return {error: "Could not find any item with this ID"};
        }
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