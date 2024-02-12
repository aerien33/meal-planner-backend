var DataService = require('../dataService');

class TypeService extends DataService {

    constructor(Models, Validator) {
        super(Models, Validator);
    }


    async createItem(data) {
        return super.createItem(data, this._Models.type);
    }

    async getAll() {
        try {
            return super.getAll(this._Models.type);
        } catch {
            return {error: "Could not fetch the meal types"};
        }
    }

}

module.exports = TypeService;