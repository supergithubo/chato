var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')
var clearDB = require('mocha-mongoose')(process.env.DB_URI, {
    noClear: true
});

describe('/webhook', function() {
  
    var app, postbackStub, messageStub, request, route;
    
    before(function(done) {
        mongoose.Promise = global.Promise;
        var connection = mongoose.connect(process.env.DB_URI, { useMongoClient: true });
        
        postbackStub = sinon.stub();
        messageStub = sinon.stub();
        
        app = express();
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        
        route = proxyquire('../routes/webhook.route.js', {
            '../services/postback.service': postbackStub,
            '../services/message.service': messageStub
        });
        
        app.use('/v1', [route]);
        request = supertest(app);

        done();
    });

    before(function(done) {
        clearDB(done);
    });
    
    it('should test GET /webhook (verified call)', function(done) {
        request
            .get('/v1/webhook')
            .query({ 'hub.verify_token' : process.env.VERIFICATION_TOKEN })
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(200);
                done();
            });
    });
    
    it('should test GET /webhook (non verified call)', function(done) {
        request
            .get('/v1/webhook')
            .query({ 'hub.verify_token' : 'unknown' })
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(403);
                done();
            });
    });
    
    it('should test POST /webhook (page subscription)', function(done) {
        postbackStub.returns(null);
        messageStub.returns(null);
        
        request
            .post('/v1/webhook')
            .send({ object: 'page', entry: []})
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(200);
                done();
            });
    });
    
    it('should test POST /webhook (not page subscription)', function(done) {
        postbackStub.returns(null);
        messageStub.returns(null);
        
        request
            .post('/v1/webhook')
            .send({ object: 'other', entry: []})
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(405);
                done();
            });
    });
    
    it('should test POST /webhook (message event)', function(done) {
        var messageEvent = false;
        postbackStub.process = function (event) {
            messageEvent = false;
        };
        messageStub.process = function (event) {
            messageEvent = true;
        };
        
        
        request
            .post('/v1/webhook')
            .send({ 
                object: 'page', 
                entry: [
                    {
                        id: '293269001153799',
                        time: 1458692752478,
                        messaging: [{
                            sender: { id: '100000969297090' },
                            recipient: { id: '293269001153799' },
                            timestamp: 1458692752478,
                            message: {}
                        }]
                    }
                ]
            })
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(200);
                messageEvent.should.be.equal(true);
                done();
            });
    });
    
    it('should test POST /webhook (postback event)', function(done) {
        var postbackEvent = false;
        postbackStub.process = function (event) {
            postbackEvent = true;
        };
        messageStub.process = function (event) {
            postbackEvent = false;
        };
        
        request
            .post('/v1/webhook')
            .send({ 
                object: 'page', 
                entry: [
                    {
                        id: '293269001153799',
                        time: 1458692752478,
                        messaging: [{
                            sender: { id: '100000969297090' },
                            recipient: { id: '293269001153799' },
                            timestamp: 1458692752478,
                            postback: {}
                        }]
                    }
                ]
            })
            .end(function(err, res) {
                if (err) throw err;
                res.status.should.be.equal(200);
                postbackEvent.should.be.equal(true);
                done();
            });
    });
    
    after(function(done){
        mongoose.connection.close();
        done();
    });
});