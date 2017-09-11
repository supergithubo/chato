// models/input.model.js

var mongoose = require('mongoose');
var types = require('./input-types.enum');

var InputSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: types.keys,
            message: '`{VALUE}` role currently not supported'
        },
        required: true,
        default: types.enum.COMMAND.key
    },
    value: {
        type: String,
        required: true
    }
});

exports.schema = InputSchema;
exports.model = mongoose.model('Input', InputSchema);