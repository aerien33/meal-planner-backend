var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Ingredient = require('./model/ingredient');
var Type = require('./model/type');



app.post('/ingredients', async (request, response) => {
    try {
        const ingredient = await new Ingredient();
        ingredient.title = request.body.title;
        ingredient.quantity = request.body.quantity;
        ingredient.unit = request.body.unit;
        
        ingredient.save();
        response.status(200).send(ingredient);
    } catch {
        response.status(500).send({error:"Could not save ingredient"});
    }
});



app.post('/types', async (request, response) => {
    try {
        const type = await new Type();
        type.title = request.body.title;
        type.defaultOrder = request.body.defaultOrder;
        
        type.save();
        response.status(200).send(type);
    } catch {
        response.status(500).send({error:"Could not save type of meal"});
    }
});



app.get('/ingredients', async (request, response) => {
    try {
        const ingredients = await Ingredient.find();
        response.status(200).send(ingredients);
    } catch {
        response.status(500).send({error:"Could not fetch ingredients"});
    }
});



app.get('/types', async (request, response) => {
    try {
        const types = await Type.find();
        response.status(200).send(types);
    } catch {
        response.status(500).send({error:"Could not fetch types of meals"});
    }
});



app.put('/ingredients/:_id', async (request, response) => {
    try {
        const ingredient = await Ingredient.findById(request.params._id);
        const update = request.body;
            
        if (!update.title || update.title === "") {
            response.status(500).send({error:"Please provide the title for the ingredient"});
        } else if (!update.quantity || typeof update.quantity !== 'number') {
            response.status(500).send({error:"Please provide the quantity for the ingredient as a number"});
        } else if (!update.unit || update.unit === "") {
            response.status(500).send({error:"Please provide the unit of the ingredient"});
        } else {
            const updated = ingredient.saveAs(update);
            response.status(200).send(updated);
        }
        
    } catch {
        response.status(500).send({error:"Could not find the ingredient ID"});
    }
});



app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});