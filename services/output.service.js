// services/output.service.js

var Output = require('../models/output.model').model;

exports.getOutputs = function(recipe_id, done) {
    Output.find({ recipe: recipe_id }, null, { sort: { priority: 'asc' } }, function(err, outputs) {
        if (err) return done(err);

        return done(null, outputs);
    });
}

exports.saveOutput = function(recipe_id, output, done) {
    output.recipe = recipe_id;
    output.save(function(err) {
        if (err) return done(err);
        
        return done(null, output);
    });
}

exports.getOutput = function(recipe_id, id, done) {
    Output.findOne({ recipe: recipe_id, _id: id }, function(err, output) {
        if (err) return done(err);
        
        return done(null, output);
    });
}

exports.deleteOutput = function(recipe_id, id, done) {
    Output.remove({ recipe: recipe_id, _id: id }, function(err) {
        if (err) return done(err);
        
        return done(null);
    });
}