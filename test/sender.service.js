var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

describe('sender service', function() {
  
    var app, service, requestStub, errorhandlerStub;
    
    before(function(done) {
        requestStub = sinon.stub();
        errorhandlerStub = sinon.stub();
        
        service = proxyquire('../services/sender.service', {
            'request': requestStub,
            '../helpers/errorhandler': errorhandlerStub
        });
        
        done();
    });

    it('should test successful sending', function(done) {
        var success = true;
        errorhandlerStub.handle = function (error) {
            success = false;
        };
        
        requestStub.post = function (options, callback) {
            callback(null, null, { "recipient_id": "100000969297090", "message_id": "1" });
        };
        
        service.send(100000969297090, "Hi Winston. My name is Chato Bot.");
        
        success.should.be.equal(true);
        done();
    });

    it('should test unsuccessful sending', function(done) {
        var errorHandled;
        errorhandlerStub.handle = function (error) {
            errorHandled = error;
        };
        
        requestStub.post = function (options, callback) {
            callback(true, {error: { message: "Unauthorized", code: 401 }}, null);
        };
        
        service.send(100000969297090, "Hi Winston. My name is Chato Bot.");
        
        errorHandled.code.should.be.equal(401);
        errorHandled.message.should.be.equal("Unauthorized");
        done();
    });
    
    after(function(done){
        done();
    });
});