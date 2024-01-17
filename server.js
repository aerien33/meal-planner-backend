var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.status(200).send("Success!");
});

app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});