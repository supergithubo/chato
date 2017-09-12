var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

describe('postback callback', function() {
  
    var app, service, requestStub, senderStub, errorhandlerStub;
    
    before(function(done) {
        requestStub = sinon.stub();
        senderStub = sinon.stub();
        errorhandlerStub = sinon.stub();
        
        service = proxyquire('../services/callbacks/postback.service', {
            'request': requestStub,
            '../sender.service': senderStub,
            '../../helpers/errorhandler': errorhandlerStub
        });
        
        done();
    });

    it('should test process Greeting payload', function(done) {
        var response;
        senderStub.send = function (senderId, textObject) {
            response = textObject.text;
        };
        
        requestStub.get = function (options, callback) {
            callback(null, null, '{ "first_name": "Winston", "id": "100000969297090" }');
        };
        
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            postback: {
                title: 'Get Started',
                payload: 'Greeting'
            }
        });
        
        response.should.be.equal('Hi Winston. My name is Chato Bot.');
        done();
    });

    it('should test process Graph API error', function(done) {
        var errorHandled;
        errorhandlerStub.handle = function (error) {
            errorHandled = error;
        };
        
        requestStub.get = function (options, callback) {
            callback(true, {error: { message: "Unauthorized", code: 401 }}, null);
        };
        
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            postback: {
                title: 'Get Started',
                payload: 'Greeting'
            }
        });
        
        errorHandled.code.should.be.equal(401);
        errorHandled.message.should.be.equal("Unauthorized");
        done();
    });
    
    it('should test process unknown payload', function(done) {
        var errorHandled;
        errorhandlerStub.handle = function (error) {
            errorHandled = error;
        };
        
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            postback: {
                title: 'Get Started',
                payload: 'Unknown'
            }
        });
        
        errorHandled.code.should.be.equal(405);
        errorHandled.message.should.be.equal("Payload not supported");
        done();
    });

    after(function(done){
        done();
    });
});