// services/recipe.service.js

var Recipe = require('../models/recipe.model').model;

exports.getRecipes = function(done) {
    Recipe.find(function(err, recipes) {
        if (err) return done(err);

        return done(null, recipes);
    });
}

exports.saveRecipe = function(recipe, done) {
    recipe.save(function(err) {
        if (err) return done(err);
        
        return done(null, recipe);
    });
}

exports.getRecipe = function(id, done) {
    Recipe.findById(id, function(err, recipe) {
        if (err) return done(err);
        
        return done(null, recipe);
    });
}

exports.deleteRecipe = function(id, done) {
    Recipe.remove({ _id: id }, function(err) {
        if (err) return done(err);
        
        return done(null);
    });
}