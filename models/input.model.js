// models/input.model.js

var mongoose = require('mongoose');
var types = require('./input-types.enum');

var InputSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    type: {
        type: String,
        enum: {
            values: types.keys,
            message: '`{VALUE}` input type currently not supported'
        },
        required: true,
        default: types.enum.COMMAND.key
    },
    value: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 0,
        required: true
    }
});

exports.schema = InputSchema;
exports.model = mongoose.model('Input', InputSchema);