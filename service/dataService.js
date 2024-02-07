
// Abstract Class
class DataService {

    #validator;

    constructor(validator) {
        if (this.constructor === DataService) {
            throw new Error("Abstract classes can't be instantiated.");
        } else {
            this.validator = validator;
        }
    }



    //Template methods
    async createItem(data) {
        try {
            const item = await this.createModel();
            const valid = this.validateItem(data, item);

            if(valid.error) {
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
    async createModel() {
        throw new Error("Method 'createModel()' must be implemented.");
    }

    validateItem(data, model) {
        return this.validator.validate(data, model);
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