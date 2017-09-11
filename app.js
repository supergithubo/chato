var express = require("express");
var bodyParser = require("body-parser");

var webhookRouter = require("./routes/webhook");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var server = app.listen((process.env.PORT || 5000));

app.use('/v1', [webhookRouter]);
app.use(function(err, req, res, next) {
    console.log(err);
    if(err.name == 'ValidationError' || err.message == 'validation error') {
        return res.status(422).send(err);
    }
    return res.status(500).send(err);
});

module.exports = server;