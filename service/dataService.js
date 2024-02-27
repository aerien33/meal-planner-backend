
var Models = require('../model/allModels');
var Validator = require('../dto_validation/jsonValidator');
var Mapper = require('../mapper/mapper');

class DataService {

    static instance;

    #Models;
    #Validator;
    #Mapper;

    constructor(Models) {
        if (this.constructor.instance) {
           return this.constructor.instance;
       } else {
           this.#Models = Models;
           this.#Validator = new Validator(this.#Models);
           this.#Mapper = new Mapper(this.#Models, this);
           this.constructor.instance = this;
       }
    }


    //Main methods
    async saveItem(id, data, Model) {
        try {
            const item = await this.getItemToSaveByID(id, Model);

            if (item.error) {
                return item;
            } else {
                const valid = this.validateFormat(data, item);

                if (valid.error) {
                    return valid;
                } else {
                    const mapped = await this.#Mapper.mapToItem(valid, item);

                    if (mapped.error) {
                        return mapped;
                    } else {
                        const saved = await this.saveToDB(mapped, item);
                        return saved;
                    }
                }
            }

        } catch {
            return {error: "Could not save the item"};
        }
    }


    async getAll(Model) {
        try {
            return Model.find({}, '-__v');
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
                 const info = await this.deleteFromDB(item);

                 if (info.error) {
                     return info;
				 } else {
                     return {"message":"Deleted the following items", "items":[item]};
                 }
             }

         } catch {
             return {error: "Could not delete the item"};
         }
    }


    async askToDeleteMany(filter, Model) {
        try {
            const toDelete = await this.getItems(filter, Model);

            if (toDelete.error) {
                return toDelete;
            } else {
                return {"warning":"The following items will be deleted", "items":toDelete};
            }

        } catch {
            return {error: "Could not send the request to delete the items"};
        }
    }


    async deleteMany(filter, Model) {
        try {
            const toDelete = await this.getItems(filter, Model);

            if (toDelete.error) {
                return toDelete;
            } else {
                const info = await this.deleteManyFromDB(filter, Model);

                if (info.error) {
                    return info;
                } else {
                    return {"message":"Deleted the following items", "items":toDelete};
                }
            }

        } catch {
            return {error: "Could not send the request to delete the items"};
        }
    }




    //Supporting methods
    async getItemToSaveByID(id, Model) {
        return this.getItemToSave({"_id":id}, Model);
    }


     async getItemToSave(filter, Model) {
        try {
            let item = await this.getItemByFilter(filter, Model);
            if (item.error) {
                item = await this.createItem(Model);
            }

            return item;

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
            const item = await Model.findById(id, '-__v');

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
            const item = await Model.findOne(filter, '-__v');

            if (item == null) {
                return {error: "Could not find any item matching this filter criteria"}
            } else {
                return item;
            }

        } catch {
            return {error: "Could not find any item matching this filter criteria"};
        }
    }


    async getItemByTitle(title, Model) {
        try {
            const item = await this.getItemByFilter({"title":title}, Model);

            if (item == null) {
                return {error: "Could not find any item with this title"};
            } else {
                return item;
            }

        } catch {
            return {error: "Could not find any item with this title"};
        }
    }


    validateFormat(data, item) {
        return this.#Validator.validateFormat(data, item);
    }


    async saveToDB(data, item) {
        return await item.saveAs(data);
    }


    async deleteFromDB(item) {
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


    async deleteManyFromDB(filter, Model) {
        try {
            const info = await Model.deleteMany(filter);

            if (!info.deletedCount || info.deletedCount < 1) {
                return {error: info};
            } else {
                return info;
            }

        } catch {
            return {error: "Could not delete the items"};
        }
    }

}

module.exports = DataService;