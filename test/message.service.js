var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

describe('message callback', function() {
  
    var app, service, senderStub, errorhandlerStub;
    
    before(function(done) {
        senderStub = sinon.stub();
        errorhandlerStub = sinon.stub();
        
        service = proxyquire('../services/callbacks/message.service', {
            '../sender.service': senderStub,
            '../../helpers/errorhandler': errorhandlerStub
        });
        
        done();
    });

    it('should test process text message', function(done) {
        var response;
        senderStub.send = function (senderId, textObject) {
            response = textObject.text;
        };
      
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            message: {
                text: "Hello"
            }
        });
        
        response.should.be.equal('hello');
        done();
    });
    
    it('should test process attachment message', function(done) {
        var response;
        senderStub.send = function (senderId, textObject) {
            response = textObject.text;
        };
      
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            message: {
                attachments: [
                    {
                        type:"image",
                    }
                ]
            }
        });
        
        response.should.be.equal("Sorry, I don't know what to respond to attachments yet.");
        done();
    });
    
    it('should test process unknown message', function(done) {
        var errorHandled;
        errorhandlerStub.handle = function (error) {
            errorHandled = error;
        };
      
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            message: {
                unknown: {}
            }
        });
        
        errorHandled.code.should.be.equal(405);
        errorHandled.message.should.be.equal("Message type not supported");
        done();
    });

    it('should test echo message', function(done) {
        var errorHandled;
        errorhandlerStub.handle = function (error) {
            errorHandled = error;
        };
      
        service.process({
            sender: { id: '100000969297090' },
            recipient: { id: '293269001153799' },
            timestamp: 1458692752478,
            message: {
                is_echo: true,
                text: "Hello"
            }
        });
        
        errorHandled.code.should.be.equal(405);
        errorHandled.message.should.be.equal("Echo messages not supported");
        done();
    });
    
    after(function(done){
        done();
    });
});