var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

var jsonValidator = require('./service/jsonValidator');
const Validator = new jsonValidator();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Ingredient = require('./model/ingredient');
var Type = require('./model/type');



app.post('/ingredients', async (request, response) => {
    try {
        const ingredient = await new Ingredient();
        const data = request.body;

        const valid = Validator.validateIngredient(data);
        
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
        response.status(500).send({error:"Could not save the ingredient"});
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



app.get('/types', async (request, response) => {
    try {
        const types = await Type.find();
        response.status(200).send(types);
    } catch {
        response.status(500).send({error:"Could not fetch the types of meals"});
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



app.delete('/ingredients/:_id', async (request, response) => {
    try {
        const ingredient = await Ingredient.findById(request.params._id);

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



app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});