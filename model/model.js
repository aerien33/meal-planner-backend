
//Abstract class Model
module.exports = function modelMethods(schema) {

    schema.statics.saveToDB = async function(data, item) {
        return {error:"Method 'saveToDB()' must be implemented"};
    }

}