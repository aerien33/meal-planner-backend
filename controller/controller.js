var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/meal-planner-test');

var serviceFacade = require('../service/serviceFacade');
const Service = new serviceFacade();

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
        const saved = await Service.createIngredient(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the ingredient"});
    }
});



app.post('/types', async (request, response) => {
    try {
        const data = request.body;
        const saved = await Service.createType(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the type of meal"});
    }
});



app.post('/meals', async (request, response) => {
    try {
        const data = request.body;
        const saved = await Service.createMeal(data);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not save the meal"});
    }
});



app.get('/ingredients', async (request, response) => {
    try {
        const ingredients = await Service.getAllIngredients();

        setStatus(ingredients, response);
        response.send(ingredients);

    } catch {
        response.status(500).send({error:"Could not fetch the ingredients"});
    }
});



app.get('/types', async (request, response) => {
    try {
        const types = await Service.getAllTypes();

        setStatus(types, response);
        response.send(types);

    } catch {
        response.status(500).send({error:"Could not fetch the types of meals"});
    }
});



app.get('/meals', async (request, response) => {
    try {
        const meals = await Service.getAllMeals();

        setStatus(meals, response);
        response.send(meals);

    } catch {
        response.status(500).send({error:"Could not fetch the meals"});
    }
});



app.get('/ingredients/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredients = await Service.getIngredients(filter);

        setStatus(ingredients, response);
        response.send(ingredients);

    } catch {
        response.status(500).send({error:"Could not fetch ingredients matching this filter criteria"});
    }
});



app.get('/types/filter', async (request, response) => {
    try {
        const filter = request.body;
        const types = await Service.getTypes(filter);

        setStatus(types, response);
        response.send(types);

    } catch {
        response.status(500).send({error:"Could not fetch types of meals matching this filter criteria"});
    }
});



app.get('/meals/filter', async (request, response) => {
    try {
        const filter = request.body;
        const meals = await Service.getMeals(filter);

        setStatus(meals, response);
        response.send(meals);

    } catch {
        response.status(500).send({error:"Could not fetch meals matching this filter criteria"});
    }
});



app.get('/ingredients/one/filter', async (request, response) => {
    try {
        const filter = request.body;
        const ingredient = await Service.getOneIngredient(filter);

        setStatus(ingredient, response);
        response.send(ingredient);

    } catch {
        response.status(500).send({error:"Could not fetch any ingredient matching this filter criteria"});
    }
});



app.get('/types/one/filter', async (request, response) => {
    try {
        const filter = request.body;
        const type = await Service.getOneType(filter);

        setStatus(type, response);
        response.send(type);

    } catch {
        response.status(500).send({error:"Could not fetch any type of meal matching this filter criteria"});
    }
});



app.get('/meals/one/filter', async (request, response) => {
    try {
        const filter = request.body;
        const meal = await Service.getOneMeal(filter);

        setStatus(meal, response);
        response.send(meal);

    } catch {
        response.status(500).send({error:"Could not fetch any meal matching this filter criteria"});
    }
});



app.get('/ingredients/one/title', async (request, response) => {
    try {
        const title = request.body.title;
        const ingredient = await Service.getOneIngredientByTitle(title);

        setStatus(ingredient, response);
        response.send(ingredient);

    } catch {
        response.status(500).send({error:"Could not fetch any ingredient with this title"});
    }
});



app.get('/types/one/title', async (request, response) => {
    try {
        const title = request.body.title;
        const type = await Service.getOneTypeByTitle(title);

        setStatus(type, response);
        response.send(type);

    } catch {
        response.status(500).send({error:"Could not fetch any type of meal with this title"});
    }
});



app.get('/meals/one/title', async (request, response) => {
    try {
        const title = request.body.title;
        const meal = await Service.getOneMealByTitle(title);

        setStatus(meal, response);
        response.send(meal);

    } catch {
        response.status(500).send({error:"Could not fetch any meal with this title"});
    }
});



app.put('/ingredients/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await Service.updateIngredient(id, update);

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
        const saved = await Service.updateType(id, update);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not update the type of meal"});
    }
});



app.put('/meals/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const update = request.body;
        const saved = await Service.updateMeal(id, update);

        setStatus(saved, response);
        response.send(saved);

    } catch {
        response.status(500).send({error:"Could not update the meal"});
    }
});



app.delete('/ingredients/one/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await Service.deleteIngredient(id);

        setStatus(deleted, response);
        response.send(deleted);

    } catch {
        response.status(500).send({error:"Could not delete the ingredient"});
    }
});



app.delete('/types/one/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await Service.deleteType(id);

        setStatus(deleted, response);
        response.send(deleted);

        } catch {
            response.status(500).send({error:"Could not delete the type of meal"});
        }
});



app.delete('/meals/one/:_id', async (request, response) => {
    try {
        const id = request.params._id;
        const deleted = await Service.deleteMeal(id);

        setStatus(deleted, response);
        response.send(deleted);

        } catch {
            response.status(500).send({error:"Could not delete the meal"});
        }
});



app.delete('/ingredients', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.requestDeleteManyIng(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request deleting many ingredients"});
        }
});



app.delete('/types', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.requestDeleteManyTypes(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request deleting many types of meals"});
        }
});



app.delete('/meals', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.requestDeleteManyMeals(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request deleting many meals"});
        }
});



app.delete('/ingredients/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.deleteManyIngredients(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not delete the ingredients"});
        }
});



app.delete('/types/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.deleteManyTypes(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not delete the types of meals"});
        }
});



app.delete('/meals/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.deleteManyMeals(filter);

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not delete the meals"});
        }
});



app.delete('/fullFormat', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.requestFormat();

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not request to format the database"});
        }
});



app.delete('/fullFormat/ok', async (request, response) => {
    try {
        const filter = request.body;
        const info = await Service.fullFormat();

        setStatus(info, response);
        response.send(info);

        } catch {
            response.status(500).send({error:"Could not format the database"});
        }
});




app.listen(3004, function() {
    console.log("Meal Planner API running on port 3004...");
});