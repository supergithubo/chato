// helpers/validation.js

var Joi = require('joi');

exports.recipe = {
    new: {
        body: {
            name: Joi.string().required(),
            priority: Joi.number().integer().required()
        }
    },
    update: {
        body: {
            priority: Joi.number().integer()
        }
    }
};

exports.input = {
    new: {
        body: {
            recipe: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
            type: Joi.string().required(),
            value: Joi.any().required(),
            priority: Joi.number().integer().required()
        }
    },
    update: {
        body: {
            recipe: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
            priority: Joi.number().integer()
        }
    }
}

exports.output = {
    new: {
        body: {
            recipe: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).required(),
            type: Joi.string().required(),
            value: Joi.any().required(),
            priority: Joi.number().integer().required()
        }
    },
    update: {
        body: {
            recipe: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
            priority: Joi.number().integer()
        }
    }
}