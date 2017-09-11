// models/output.model.js

var mongoose = require('mongoose');
var types = require('./output-types.enum');

var OutputSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: types.keys,
            message: '`{VALUE}` output type currently not supported'
        },
        required: true,
        default: types.enum.TEXT.key
    },
    value: {
        type: String,
        required: true
    }
});

exports.schema = OutputSchema;
exports.model = mongoose.model('Output', OutputSchema);