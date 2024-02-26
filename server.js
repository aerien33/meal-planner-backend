var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

var dataService = require('./service/dataService');
const DataService = new dataService();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



function setStatus(obj, response) {
    if (obj.error) {
        response.status(500);
    } else {
        response.status(200);
    }
}



app.post('/ingredients', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createIngredient(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the ingredient"});
    }
});



app.post('/types', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createType(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the type of meal"});
    }
});



app.post('/meals', async (request, response) => {
    try {
        const data = request.body;
        const saved = await DataService.createMeal(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the meal"});
    }
});



app.get('/ingredients', async (request, response) => {
    try {
        const ingredients = await DataService.getAllIngredients();

        setStatus(ingredients, response);
        response.send(ingredients);

    } catch {
        response.status(500).send({error:"Could not fetch the ingredients"});
    }
});



app.get('/types', async (request, response) => {
    try {
        const types = await DataService.getAllTypes();

        setStatus(types, response);
        response.send(types);

    } catch {
        response.status(500).send({error:"Could not fetch the types of meals"});
    }
});



app.get('/meals', async (request, response) => {
    try {
        const meals = await DataService.getAllMeals();

        setStatus(meals, response);
        response.send(meals);

    } catch {
        response.status(500).send({error:"Could not fetch the meals"});
    }
});



app.get('/ingredients/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredients = await DataService.getIngredients(filter);

        setStatus(ingredients, response);
        response.send(ingredients);

    } catch {
        response.status(500).send({error:"Could not fetch ingredients matching this filter criteria"});
    }
});



app.get('/types/filter', async (request, response) => {
    try {
        const filter = request.body;
        const types = await DataService.getTypes(filter);

        setStatus(types, response);
        response.send(types);

    } catch {
        response.status(500).send({error:"Could not fetch types of meals matching this filter criteria"});
    }
});



app.get('/ingredients/one/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredient = await DataService.getOneIngredient(filter);

        setStatus(ingredient, response);
        response.send(ingredient);

    } catch {
        response.status(500).send({error:"Could not fetch any ingredient matching this filter criteria"});
    }
});



app.get('/types/one/filter', async (request, response) => {
    try {
        const filter = request.body;
        const type = await DataService.getOneType(filter);

        setStatus(type, response);
        response.send(type);

    } catch {
        response.status(500).send({error:"Could not fetch any type of meal matching this filter criteria"});
    }
});



app.get('/ingredients/one/title', async (request, response) => {
    try {
        const title = request.body.title;
        const ingredient = await DataService.getOneIngredientByTitle(title);

        setStatus(ingredient, response);
        response.send(ingredient);

    } catch {
        response.status(500).send({error:"Could not fetch any ingredient with this title"});
    }
});



app.get('/types/one/title', async (request, response) => {
    try {
        const title = request.body.title;
        const type = await DataService.getOneTypeByTitle(title);

        setStatus(type, response);
        response.send(type);

    } catch {
        response.status(500).send({error:"Could not fetch any type of meal with this title"});
    }
});



app.put('/ingredients/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await DataService.updateIngredient(id, update);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not update the ingredient"});
    }
});



app.put('/types/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await DataService.updateType(id, update);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not update the type of meal"});
    }
});



app.delete('/ingredients/one/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await DataService.deleteIngredient(id);

        setStatus(deleted, response);
        response.send(deleted);

    } catch {
        response.status(500).send({error:"Could not delete the ingredient"});
    }
});



app.delete('/types/one/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await DataService.deleteType(id);

        setStatus(deleted, response);
        response.send(deleted);

        } catch {
            response.status(500).send({error:"Could not delete the type of meal"});
        }
});



app.delete('/ingredients', async (request, response) => {
    try {
        const filter = request.body;
        const info = await DataService.askToDeleteManyIngredients(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request deleting many ingredients"});
        }
});



app.delete('/types', async (request, response) => {
    try {
        const filter = request.body;
        const info = await DataService.askToDeleteManyTypes(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request deleting many types of meals"});
        }
});



app.delete('/ingredients/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await DataService.deleteManyIngredients(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not delete the ingredients"});
        }
});



app.delete('/types/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await DataService.deleteManyTypes(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not delete the types of meals"});
        }
});




app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});