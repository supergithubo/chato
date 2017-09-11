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
          recipeService.saveRecipe(recipe, function(err, recipe) {
              if (err) return next(err);
              
              return res.status(201).json(recipe);
          });
    })
    
module.exports = router;