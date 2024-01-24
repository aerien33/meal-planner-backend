class jsonValidator {
    
    validateIngredient(data) {
        if (!data.title || data.title === "") {
            return {error:"Please provide the title for the ingredient"};
        } else if (!data.quantity || typeof data.quantity !== 'number') {
            return {error:"Please provide the quantity for the ingredient as a number"};
        } else if (!data.unit || data.unit === "") {
            return {error:"Please provide the unit of the ingredient"};
        } else {
            return data;
        }
    }

}

module.exports = jsonValidator;