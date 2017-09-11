// models/message.service.js

var sender = require('./sender.service');

exports.process = function(event) {
    if (!event.message.is_echo) {
        var message = event.message;
        var senderId = event.sender.id;

        console.log("Received message from senderId: " + senderId);
        console.log("Message is: " + JSON.stringify(message));

        if (message.text) {
            var formattedMsg = message.text.toLowerCase().trim();
            
            sender.send(senderId, { text: formattedMsg });
        } else if (message.attachments) {
            sender.send(senderId, { text: "Sorry, I don't understand your request." });
        }
    }
}