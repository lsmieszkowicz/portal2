'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var db = require('../../database');
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

  it('should try to register user with login already existing in db', function(done){

    var registrationData = {
        login: 'test',
        name: 'test_name',
        surname: 'test_surname',
        email: 'login@domain.com',
        password: 'password'     
    };

    request(app)
      .post('/api/auth/register')
      .send(registrationData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
          if(err) return done(err);

          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('user_exists');

          done();
      });
  });

  it('should register new user', function(done){
    var registrationData = {
        id: 3,
        login: 'new_login',
        name: 'test_name',
        surname: 'test_surname',
        email: 'login@domain.com',
        password: 'qweasdzxc'     
    };

    request(app)
      .post('/api/auth/register')
      .send(registrationData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
          if(err) return done(err);

          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');

          var token = res.body.token;
          jwt.verify(token, process.env.SESSION_SECRET);

          done();
      }); 
  });

  after(function(done){
      var connection = db.connection;

      var sql = 'DELETE FROM user WHERE id = 3';

      connection.query(sql, function(err, result){
        if(err) return done(err);
        done();
      });
  });

});