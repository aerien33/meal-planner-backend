var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

var modelFactory =  require('./service/modelFactory');
var jsonValidator = require('./service/jsonValidator');
var dataService = require('./service/dataService');

const Factory = new modelFactory();
const Validator = new jsonValidator();
const DataService = new dataService(Factory, Validator);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Ingredient = require('./model/ingredient');
var Type = require('./model/type');



app.post('/ingredients', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createItem(data, "ingredient");

        if(saved.error) {
            response.status(500).send(saved);
        } else {
            response.status(200).send(saved);
        }

    } catch {
        response.status(500).send({error:"Could not save the ingredient"});
    }
});



app.post('/types', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createItem(data, "type");

        if(saved.error) {
            response.status(500).send(saved);
        } else {
            response.status(200).send(saved);
        }

    } catch {
        response.status(500).send({error:"Could not save the type of meal"});
    }
});



app.get('/ingredients', async (request, response) => {
    try {
        const ingredients = await Ingredient.find();
        response.status(200).send(ingredients);
    } catch {
        response.status(500).send({error:"Could not fetch the ingredients"});
    }
});



app.get('/ingredients/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredients = await Ingredient.find(filter);

        if(!Array.isArray(ingredients)) {
            response.status(500).send({error:"Could not fetch the array of ingredients matching this filter criteria"});
        } else if (!ingredients.length) {
            response.status(500).send({error:"There are no ingredients matching this filter criteria"});
        } else {
            response.status(200).send(ingredients);
        }

    } catch {
        response.status(500).send({error:"Could not fetch the ingredients matching this filter criteria"});
    }
});



app.get('/types', async (request, response) => {
    try {
        const types = await Type.find();
        response.status(200).send(types);
    } catch {
        response.status(500).send({error:"Could not fetch the types of meals"});
    }
});



app.get('/types/filter', async (request, response) => {
    try {
        const filter = request.body;
        const types = await Type.find(filter);

        if(!Array.isArray(types)) {
            response.status(500).send({error:"Could not fetch the array of meal types matching this filter criteria"});
        } else if (!types.length) {
            response.status(500).send({error:"There are no meal types matching this filter criteria"});
        } else {
            response.status(200).send(types);
        }

    } catch {
        response.status(500).send({error:"Could not fetch the meal types matching this filter criteria"});
    }
});



app.put('/ingredients/:_id', async (request, response) => {
    try {
        const ingredient = await Ingredient.findById(request.params._id);
        const update = request.body;
        
        const valid = Validator.validateIngredient(update);
        
        if(valid.error) {
            response.status(500).send(valid);
        } else {
            const saved = ingredient.saveAs(valid);
        
            if(saved.error) {
                response.status(500).send(saved);
            } else {
                response.status(200).send(saved);
            } 
        }
        
    } catch {
        response.status(500).send({error:"Could not find the ingredient ID"});
    }
});



app.put('/types/:_id', async (request, response) => {
    try {
        const type = await Type.findById(request.params._id);
        const update = request.body;

        const valid = Validator.validateType(update);

        if(valid.error) {
            response.status(500).send(valid);
        } else {
            const saved = type.saveAs(valid);

            if(saved.error) {
                response.status(500).send(saved);
            } else {
                response.status(200).send(saved);
            }
        }

    } catch {
        response.status(500).send({error:"Could not find the ID of the type of meal"});
    }
});



app.delete('/ingredients/:_id', async (request, response) => {
    try {
        const ingredient = await Ingredient.findById(request.params._id);

        if (ingredient == null) {
            response.status(500).send({error:"Could not find the ingredient ID"});
            return;
        }

        try {
            const info = await ingredient.deleteOne();

            if(info.deletedCount == 1) {
                response.status(200).send(ingredient);
            } else {
                response.status(500).send({error:info});
            }

        } catch {
            response.status(500).send({error:"Could not delete the ingredient"});
        }

    } catch {
        response.status(500).send({error:"Could not find the ingredient ID"});
    }
});



app.delete('/types/:_id', async (request, response) => {
    try {
        const type = await Type.findById(request.params._id);

        if (type == null) {
            response.status(500).send({error:"Could not find the ID of the type of meal"});
            return;
        }

        try {
            const info = await type.deleteOne();

            if(info.deletedCount == 1) {
                response.status(200).send(type);
            } else {
                response.status(500).send({error:info});
            }

        } catch {
            response.status(500).send({error:"Could not delete the type of meal"});
        }

    } catch {
        response.status(500).send({error:"Could not find the ID of the type of meal"});
    }
});



app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});