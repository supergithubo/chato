// services/callbacks/message.service.js

var sender = require('../sender.service');
var errorhandler = require('../../helpers/errorhandler');

exports.process = function(event) {
    if (!event.message.is_echo) {
        var message = event.message;
        var senderId = event.sender.id;

        if (message.text) {
            var formattedMsg = message.text.toLowerCase().trim();
            
            sender.send(senderId, { text: formattedMsg });
        } else if (message.attachments) {
            sender.send(senderId, { text: "Sorry, I don't know what to respond to attachments yet." });
        } else {
            errorhandler.handle({ message: "Message type not supported", code: 405 });
        }
    } else {
        errorhandler.handle({ message: "Echo messages not supported", code: 405 });
    }
}