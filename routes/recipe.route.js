// routes/recipe.route.js

var express = require('express');
var router = express.Router();

var recipeService = require('../services/recipe.service');

router.route('/recipes')
    .get(function(req, res, next) {
          recipeService.getRecipes(function(err, recipes) {
              if (err) return next(err);

              return res.json(recipes);
          });
    })
    
module.exports = router;