// models/recipe.model.js

var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 0,
        required: true
    }
});

exports.schema = RecipeSchema;
exports.model = mongoose.model('Recipe', RecipeSchema);