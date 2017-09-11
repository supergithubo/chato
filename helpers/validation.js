// helpers/validation.js

var Joi = require('joi');

exports.recipe = {};
exports.recipe.new = {
    body: {
        name: Joi.string().required()
    }
};