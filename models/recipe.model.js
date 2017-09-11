// models/recipe.model.js

var mongoose = require('mongoose');
var inputSchema = require('./input.model').schema;
var outputSchema = require('./output.model').schema;

var RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inputs: [inputSchema],
    outputs: [outputSchema],
    priority: {
        type: Number,
        default: 0,
        required: true
    }
});

exports.schema = RecipeSchema;
exports.model = mongoose.model('Recipe', RecipeSchema);