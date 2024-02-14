
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

    async getIngredients(filter) {
        return this.getItems(filter, this._Models.ingredient);
    }

    async getTypes(filter) {
        return this.getItems(filter, this._Models.type);
    }

    async getOneIngredient(filter) {
        return this.getItemByFilter(filter, this._Models.ingredient);
    }

    async getOneType(filter) {
        return this.getItemByFilter(filter, this._Models.type);
    }

    async updateIngredient(id, data) {
        return this.saveItem(id, data, this._Models.ingredient);
    }

    async updateType(id, data) {
        return this.saveItem(id, data, this._Models.type);
    }

    async deleteIngredient(id) {
        return this.deleteItem(id, this._Models.ingredient);
    }

    async deleteType(id) {
        return this.deleteItem(id, this._Models.type);
    }



    //Main methods
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


    async getItems(filter, Model) {
         try {
             const items = await Model.find(filter);

             if(!Array.isArray(items)) {
                 return {error: "Could not fetch the array of items matching this filter criteria"};
             } else if (!items.length) {
                 return {error: "There are no items matching this filter criteria"};
             } else {
                 return items;
             }

         } catch {
             return {error: "Could not fetch items matching this filter criteria"};
         }
    }


    async deleteItem(id, Model) {
         try {
             const item = await this.getItemByID(id, Model);

             if (item.error) {
                 return item;
             } else {
                 const info = await this.deleteFromDatabase(item);

                 if (info.error) {
                     return info;
				 } else {
                     return item;
                 }
             }

         } catch {
             return {error: "Could not delete the item"};
         }
    }




    //Supporting methods
    async getItemToSave(id, Model) {
            try {
                if (!id) {
                    return this.createItem(Model);
                } else {
                    return this.getItemByID(id, Model);
                }
            } catch {
                return {error: "Could not get the item which will be saved"};
            }
        }


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


    getID(item) {
         return item._id;
    }


    getIDs(items) {
        let IDs = [];
        items.map(item => IDs.push(item._id));
        return IDs;
    }


    async getItemByID(id, Model) {
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


    async getItemByFilter(filter, Model) {
        try {
            const item = await Model.findOne(filter);

            if (item == null) {
                return {error: "Could not find any item matching this filter criteria"}
            } else {
                return item;
            }

        } catch {
            return {error: "Could not find any item matching this filter criteria"};
        }
    }


    validateItem(data, item) {
        return this.#Validator.validateItem(data, item);
    }


    saveToDatabase(data, item) {
        return item.saveAs(data);
    }


    async deleteFromDatabase(item) {
        try {
            const info = await item.deleteOne();

            if (info.deletedCount == 1) {
                return info;
            } else {
                return {error: info};
            }

        } catch {
            return {error: "Could not delete the item"};
        }
    }

}

module.exports = DataService;