// models/sender.service.js

exports.send = function(id, message) {
    request({
        url: "https://graph.facebook.com/v2.10/me/messages",
        qs: { 
            access_token: process.env.PAGE_ACCESS_TOKEN 
        },
        method: "POST",
        json: {
            recipient: { id: id },
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });  
}