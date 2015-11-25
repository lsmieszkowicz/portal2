'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var jwt = require('jsonwebtoken');

describe('Auth tests', function(){

  var loginData = {
      login: 'test',
      password: 'password'
  };

  it('should login and return token and user data', function(done){
    request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);

        var token = res.body.data.token;

        jwt.verify(token, process.env.SESSION_SECRET);

        done();
      });

  });

});