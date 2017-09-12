// routes/webhook.route.js

var express = require('express');
var router = express.Router();

var postback = require('../services/postback.service');
var message = require('../services/message.service');

router.route('/webhook')
    .get(function(req, res, next) {
        if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
            console.log("Verified webhook");
            return res.status(200).send(req.query["hub.challenge"]);
        } else {
            console.error("Verification failed. The tokens do not match.");
            return res.status(403).send();
        }
    })
    .post(function(req, res, next) {
        if (req.body.object === 'page') {
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
            res.status(200).send();
        } else {
            return res.status(405).send();
        }
    });
    
module.exports = router;