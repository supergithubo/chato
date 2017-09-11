// models/output-types.enum.js

var Enum = require('enum');

var outputTypes = new Enum([
    'TEXT', 'IMAGE'
]);

exports.enum = outputTypes;

var keys = [];
outputTypes.enums.forEach(function(enumItem) {
    keys.push(enumItem.key);
});

exports.keys = keys;

