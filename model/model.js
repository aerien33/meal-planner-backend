
//Abstract class Model
module.exports = function modelMethods(schema) {

    schema.statics.saveToDB = async function(data, item) {
        return {error:"Method 'saveToDB()' must be implemented"};
    }

    schema.statics.deleteFromDB = async function(item) {
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

    schema.statics.deleteManyFromDB = async function(filter) {
        try {
            const info = await this.deleteMany(filter);

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