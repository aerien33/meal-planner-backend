
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
            const toSave = await this.getItemToSaveByID(id, Model);

            if (toSave.error) {
                return toSave;
            } else {
                const dto = this.#Validator.validateFormat(data, Model);

                if (dto.error) {
                    return dto;
                } else {
                    const entity = await this.#Mapper.mapToEntity(dto, Model);

                    if (entity.error) {
                        return entity;
                    } else {
                        const saved = await Model.saveToDB(entity, toSave);
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
            return this.getItems({}, Model);
        } catch {
            return {error: "Could not fetch the items"};
        }
    }


    async getItems(filter, Model) {
         try {
             const items = await Model.find(filter, '-__v');

             if (!Array.isArray(items)) {
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
                 const info = await Model.deleteFromDB(item);

                 if (info.error) {
                     return info;
				 } else {
                     return {message: "Deleted the following item", items: [item]};
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
                let msg  = "The following ";
                if (toDelete.length == 1) {
                    msg += "item";
                } else {
                    msg += toDelete.length + " items";
                }
                msg += " will be deleted";

                return {warning: msg, items: toDelete};
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
                const info = await Model.deleteManyFromDB(filter);

                if (info.error) {
                    return info;
                } else {
                    let msg  = "Deleted the following ";
                    if (info.deletedCount == 1) {
                        msg += "item";
                    } else {
                        msg += info.deletedCount + " items";
                    }

                    return {message: msg, items: toDelete};
                }
            }

        } catch {
            return {error: "Could not delete the items"};
        }
    }


    async askToFullFormat() {
        return {warning: "Everything will be deleted, continue?"};
    }


    async fullFormat() {
        try {
            let info = await this.deleteMany({}, this.#Models.meal);
            if (info.error && info.error !== "There are no items matching this filter criteria") {
                return {error: "Could not delete all meals", info: info};

            } else {
                info = await this.deleteMany({}, this.#Models.ingredient);
                if (info.error && info.error !== "There are no items matching this filter criteria") {
                    return {error: "Could not delete all ingredients", info: info};

                } else {
                    info = await this.deleteMany({}, this.#Models.type);
                    if (info.error && info.error !== "There are no items matching this filter criteria") {
                        return {error: "Could not delete all meal types", info: info};
                    } else {
                        return {message: "Everything has been deleted successfully"};
                    }
                }
            }

        } catch {
            return {error: "Could not format the database"};
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

}


module.exports = DataService;