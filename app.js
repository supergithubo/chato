
// Base Setup
// =======

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

var webhookRouter = require("./routes/webhook.route");
var recipeRouter = require("./routes/recipe.route");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
// =============================================================================

app.use('/v1', [webhookRouter, recipeRouter]);
app.use(function(err, req, res, next) {
    console.log(err);
    if(err.name == 'ValidationError' || err.message == 'validation error') {
        return res.status(422).send(err);
    }
    return res.status(500).send(err);
});

// Server Start
// =============================================================================

var port = process.env.PORT || 5000;
var server = app.listen(port);

console.log('Listening on port ' + port);

// Database Start
// =============================================================================

var uri = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
    console.log('Connected to database on');
});

module.exports = server;