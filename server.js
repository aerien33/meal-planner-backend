var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

var allModels = require('./model/allModels');
var jsonValidator = require('./service/jsonValidator');
var dataService = require('./service/dataService');

var Models = new allModels();
const Validator = new jsonValidator(Models);
const DataService = new dataService(Models, Validator);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.post('/ingredients', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createIngredient(data);

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
        const saved = await DataService.createType(data);

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
        const ingredients = await DataService.getAllIngredients();
        response.status(200).send(ingredients);
    } catch {
        response.status(500).send({error:"Could not fetch the ingredients"});
    }
});



app.get('/ingredients/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredients = await DataService.findIngredients(filter);

        if(ingredients.error) {
            response.status(500).send(ingredients);
        } else {
            response.status(200).send(ingredients);
        }

    } catch {
        response.status(500).send({error:"Could not fetch ingredients matching this filter criteria"});
    }
});



app.get('/types', async (request, response) => {
    try {
        const types = await DataService.getAllTypes();
        response.status(200).send(types);
    } catch {
        response.status(500).send({error:"Could not fetch the types of meals"});
    }
});



app.get('/types/filter', async (request, response) => {
    try {
        const filter = request.body;
        const types = await DataService.findTypes(filter);

        if(types.error) {
            response.status(500).send(types);
        } else {
            response.status(200).send(types);
        }

    } catch {
        response.status(500).send({error:"Could not fetch meal types matching this filter criteria"});
    }
});



app.put('/ingredients/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await DataService.updateIngredient(id, update);

        if(saved.error) {
            response.status(500).send(saved);
        } else {
            response.status(200).send(saved);
        }

    } catch {
        response.status(500).send({error:"Could not update the ingredient"});
    }
});



app.put('/types/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await DataService.updateType(id, update);

        if(saved.error) {
            response.status(500).send(saved);
        } else {
            response.status(200).send(saved);
        }

    } catch {
        response.status(500).send({error:"Could not update the type of meal"});
    }
});



app.delete('/ingredients/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await DataService.deleteIngredient(id);

        if(deleted.error) {
            response.status(500).send(deleted);
        } else {
            response.status(200).send(deleted);
        }

    } catch {
        response.status(500).send({error:"Could not delete the ingredient"});
    }
});



app.delete('/types/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await DataService.deleteType(id);

        if(deleted.error) {
            response.status(500).send(deleted);
        } else {
            response.status(200).send(deleted);
        }

        } catch {
            response.status(500).send({error:"Could not delete the type of meal"});
        }
});



app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});