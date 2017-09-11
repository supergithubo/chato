// models/recipe.model.js

var mongoose = require('mongoose');
var inputSchema = require('./input-types.enu,').schema;
var outputSchema = require('./output-types.enu,').schema;

var RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inputs: [inputSchema],
    outputs: [outputSchema],
});

exports.schema = RecipeSchema;
exports.model = mongoose.model('Recipe', RecipeSchema);