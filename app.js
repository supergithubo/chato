var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var postback = require('./services/postback.service');
var message = require('./services/message.service');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

app.post("/webhook", function (req, res) {
    if (req.body.object == "page") {
        req.body.entry.forEach(function(entry) {
            entry.messaging.forEach(function(event) {
                if (event.postback) {
                    postback.process(event);
                }
                else if (event.message) {
                    message.process(event);
                }
            });
        });
        res.sendStatus(200);
    }
});