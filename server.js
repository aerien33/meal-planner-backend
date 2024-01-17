var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "_id": "38439438934",
        "title": "marchew",
        "quantity": 90,
        "unit": "g"
    },
    {
        "_id": "37378474343",
        "title": "pietruszka (korzeń)",
        "quantity": 80,
        "unit": "g"
    }
];


app.get('/ingredients', function(request, response) {
    response.status(200).send(ingredients);
});


app.post('/ingredients', function(request, response) {
    var ingredient = request.body;
    
    if (!ingredient || ingredient.title === "") {
        response.status(500).send({error: "Provide a title for the ingredient"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});


app.put('/ingredients/:_id', function(request, response) {
    
    var newTitle = request.body.title;
    
    if (!newTitle || newTitle === "") {
        response.status(500).send({error:"Provide a title for the ingredient"});
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            
            if (ing._id === request.params._id) {
                ingredients[x].title = newTitle;
                objectFound = true;
                break;
            }
        }
        
        if (!objectFound) {
            response.status(500).send({error:"Ingredient id was not found"});
        } else {
            response.send(ingredients);
        }
    }
});


app.delete('/ingredients/:_id', function(request, response) {
           
    var objectFound = false;
    for (var x = 0; x < ingredients.length; x++) {
        var ing = ingredients[x];

        if (ing._id === request.params._id) {
            var index = ingredients.indexOf(ing);
            if (index > -1) {
                ingredients.splice(index, 1);
            } else {
                console.log("Could not remove the ingredient");
            }
            objectFound = true;
            break;
        }
    }
        
    if (!objectFound) {
        response.status(500).send({error:"Ingredient id not found"})
    } else {
        response.send(ingredients);
    }
    
});


app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});