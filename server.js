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

app.get('/', function(request, response) {
    response.status(200).send(ingredients);
});

app.post('/', function(request, response) {
    var ingredient = request.body;
    
    if (!ingredient || ingredient.title == "") {
        response.status(500).send({error: "The ingredient needs a title"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});

app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});