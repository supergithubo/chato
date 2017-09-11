// models/input-types.enum.js

var Enum = require('enum');

var inputTypes = new Enum([
    'COMMAND', 'KEYWORDS'
]);

exports.enum = inputTypes;

var keys = [];
inputTypes.enums.forEach(function(enumItem) {
    keys.push(enumItem.key);
});

exports.keys = keys;

