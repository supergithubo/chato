// routes/recipe.route.js

var express = require('express');
var router = express.Router();
var validateReq = require('express-validation');
var scenario = require('../helpers/validation.js');

var Recipe = require('../models/recipe.model').model;
var recipeService = require('../services/recipe.service');

router.route('/recipes')
    .get(function(req, res, next) {
          recipeService.getRecipes(function(err, recipes) {
              if (err) return next(err);

              return res.json(recipes);
          });
    })
    .post(validateReq(scenario.recipe.new), function(req, res, next) {
          var recipe = new Recipe();
          recipe.name = req.body.name;
          recipe.priority = req.body.priority;
          recipeService.saveRecipe(recipe, function(err, recipe) {
              if (err) return next(err);
              
              return res.status(201).json(recipe);
          });
    });
    
router.route('/recipes/:recipe_id')
    .get(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                return res.json(recipe);
          });
    })
    .put(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                recipe.name = req.body.name !== undefined ? req.body.name : recipe.name;
                recipe.priority = req.body.priority !== undefined ? req.body.priority : recipe.priority;
                recipeService.saveRecipe(recipe, function(err, recipe) {
                    if (err) return next(err);
                    
                    return res.json(recipe);
                })
          });
    })
    .delete(function(req, res, next) {
          recipeService.getRecipe(req.params.recipe_id, function(err, recipe) {
                if (err) return next(err);
                if (!recipe) return res.status(404).send('Recipe not found');
                
                recipeService.deleteRecipe(recipe, function(err) {
                    if (err) return next(err);
                    
                    return res.status(204).send();
                })
          });
    });
    
module.exports = router;