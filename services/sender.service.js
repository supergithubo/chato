// services/sender.service.js

var request = require("request");
var errorhandler = require('../helpers/errorhandler');

exports.send = function(id, message) {
    request.post({
        url: "https://graph.facebook.com/v2.10/me/messages",
        qs: { 
            access_token: process.env.PAGE_ACCESS_TOKEN 
        },
        json: {
            recipient: { id: id },
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            errorhandler.handle(response.error);
        } else {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
        }
    });  
}