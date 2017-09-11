// routes/output.route.js

var express = require('express');
var router = express.Router();
var validateReq = require('express-validation');
var scenario = require('../helpers/validation.js');

var Recipe = require('../models/recipe.model').model;
var Output = require('../models/output.model').model;
var recipeService = require('../services/recipe.service');
var outputService = require('../services/output.service');

router.route('/recipes/:recipe_id/outputs')
    .get(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                outputService.getOutputs(recipe._id, function(err, outputs) {
                    if (err) return next(err);

                    return res.json(outputs);
                });
          });
    })
    .post(validateReq(scenario.output.new), function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                var output = new Output();
                output.type = req.body.type;
                output.value = req.body.value;
                output.priority = req.body.priority;
                outputService.saveOutput(recipe._id, output, function(err, output) {
                    if (err) return next(err);
                    
                    return res.status(201).json(output);
                });
          });
    });
    
router.route('/recipes/:recipe_id/outputs/:output_id')
    .get(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                outputService.getOutput(recipe._id, req.params.output_id, function(err, output) {
                    if (err) return next(err);
                    if (!output) return res.status(404).send('Output not found');

                    return res.json(output);
                });
          });
    })
    .put(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                outputService.getOutput(recipe._id, req.params.output_id, function(err, output) {
                    if (err) return next(err);
                    if (!output) return res.status(404).send('Output not found');
                    
                    output.type = req.body.type !== undefined ? req.body.type : output.type;
                    output.value = req.body.value !== undefined ? req.body.value : output.value;
                    output.priority = req.body.priority !== undefined ? req.body.priority : output.priority;
                    outputService.saveOutput(recipe._id, output, function(err, output) {
                        if (err) return next(err);
                        
                        return res.json(output);
                    });
                });
          });
    })
    .delete(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                outputService.getOutput(recipe._id, req.params.output_id, function(err, output) {
                    if (err) return next(err);
                    if (!output) return res.status(404).send('Output not found');

                    outputService.deleteOutput(recipe._id, output._id, function(err) {
                        if (err) return next(err);
                        
                        return res.status(204).send();
                    })
                });
          });
    });
    
module.exports = router;