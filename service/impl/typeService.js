var DataService = require('../dataService');
var Type = require('../../model/type');

class TypeService extends DataService {

    constructor(validator) {
        super(validator);
    }

    async createModel() {
        return new Type();
    }

}

module.exports = TypeService;