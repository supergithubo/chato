// services/input.service.js

var Input = require('../models/input.model').model;

exports.getInputs = function(recipe_id, done) {
    Input.find({ recipe: recipe_id }, null, { sort: { priority: 'asc' } }, function(err, inputs) {
        if (err) return done(err);

        return done(null, inputs);
    });
}

exports.saveInput = function(recipe_id, input, done) {
    input.recipe = recipe_id;
    input.save(function(err) {
        if (err) return done(err);
        
        return done(null, input);
    });
}

exports.getInput = function(recipe_id, id, done) {
    Input.findOne({ recipe: recipe_id, _id: id }, function(err, input) {
        if (err) return done(err);
        
        return done(null, input);
    });
}

exports.deleteInput = function(recipe_id, id, done) {
    Input.remove({ recipe: recipe_id, _id: id }, function(err) {
        if (err) return done(err);
        
        return done(null);
    });
}