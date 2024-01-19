var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Ingredient = require('./model/ingredient');
var Type = require('./model/type');

//var ingredients = [
//    {
//        "_id": "38439438934",
//        "title": "marchew",
//        "quantity": 90,
//        "unit": "g"
//    },
//    {
//        "_id": "37378474343",
//        "title": "pietruszka (korzeń)",
//        "quantity": 80,
//        "unit": "g"
//    }
//];

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


//app.put('/ingredients/:_id', function(request, response) {
//    
//    var newTitle = request.body.title;
//    
//    if (!newTitle || newTitle === "") {
//        response.status(500).send({error:"Provide a title for the ingredient"});
//    } else {
//        var objectFound = false;
//        for (var x = 0; x < ingredients.length; x++) {
//            var ing = ingredients[x];
//            
//            if (ing._id === request.params._id) {
//                ingredients[x].title = newTitle;
//                objectFound = true;
//                break;
//            }
//        }
//        
//        if (!objectFound) {
//            response.status(500).send({error:"Ingredient id was not found"});
//        } else {
//            response.send(ingredients);
//        }
//    }
//});


//app.delete('/ingredients/:_id', function(request, response) {
//           
//    var objectFound = false;
//    for (var x = 0; x < ingredients.length; x++) {
//        var ing = ingredients[x];
//
//        if (ing._id === request.params._id) {
//            var index = ingredients.indexOf(ing);
//            if (index > -1) {
//                ingredients.splice(index, 1);
//            } else {
//                console.log("Could not remove the ingredient");
//            }
//            objectFound = true;
//            break;
//        }
//    }
//        
//    if (!objectFound) {
//        response.status(500).send({error:"Ingredient id not found"})
//    } else {
//        response.send(ingredients);
//    }
//    
//});


app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});