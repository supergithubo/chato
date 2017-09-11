// routes/input.route.js

var express = require('express');
var router = express.Router();
var validateReq = require('express-validation');
var scenario = require('../helpers/validation.js');

var Recipe = require('../models/recipe.model').model;
var Input = require('../models/input.model').model;
var recipeService = require('../services/recipe.service');
var inputService = require('../services/input.service');

router.route('/recipes/:recipe_id/inputs')
    .get(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                inputService.getInputs(recipe._id, function(err, inputs) {
                    if (err) return next(err);

                    return res.json(inputs);
                });
          });
    })
    .post(validateReq(scenario.input.new), function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                var input = new Input();
                input.type = req.body.type;
                input.value = req.body.value;
                input.priority = req.body.priority;
                inputService.saveInput(recipe._id, input, function(err, input) {
                    if (err) return next(err);
                    
                    return res.status(201).json(input);
                });
          });
    });
    
router.route('/recipes/:recipe_id/inputs/:input_id')
    .get(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                inputService.getInput(recipe._id, req.params.input_id, function(err, input) {
                    if (err) return next(err);
                    if (!input) return res.status(404).send('Input not found');

                    return res.json(input);
                });
          });
    })
    .put(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                inputService.getInput(recipe._id, req.params.input_id, function(err, input) {
                    if (err) return next(err);
                    if (!input) return res.status(404).send('Input not found');
                    
                    input.type = req.body.type !== undefined ? req.body.type : input.type;
                    input.value = req.body.value !== undefined ? req.body.value : input.value;
                    input.priority = req.body.priority !== undefined ? req.body.priority : input.priority;
                    inputService.saveInput(recipe._id, input, function(err, input) {
                        if (err) return next(err);
                        
                        return res.json(input);
                    });
                });
          });
    })
    .delete(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                inputService.getInput(recipe._id, req.params.input_id, function(err, input) {
                    if (err) return next(err);
                    if (!input) return res.status(404).send('Input not found');

                    inputService.deleteInput(recipe._id, input._id, function(err) {
                        if (err) return next(err);
                        
                        return res.status(204).send();
                    })
                });
          });
    });
    
module.exports = router;