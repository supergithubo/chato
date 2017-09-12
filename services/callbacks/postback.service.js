// services/callbacks/postback.service.js

var request = require("request");
var sender = require('../sender.service');
var errorhandler = require('../../helpers/errorhandler');

exports.process = function(event) {
    var senderId = event.sender.id;
    var payload = event.postback.payload;

    if (payload === "Greeting") {
        request.get({
            url: "https://graph.facebook.com/v2.10/" + senderId,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            }
        }, function(error, response, body) {          
            var greeting = "";
            if (error) {
                errorhandler.handle(response.error);
            } else {
                var bodyObj = JSON.parse(body);
                name = bodyObj.first_name;
                greeting = "Hi " + name + ". ";
            }
            
            var message = greeting + "My name is Chato Bot.";
            sender.send(senderId, { text: message });
        });
    } else {
        errorhandler.handle({ message: "Payload not supported", code: 405 });
    }
}