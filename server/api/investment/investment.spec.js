'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var db = require('../../database');

describe('Investment API test', function(){

  var investment = {
    id: 2,
    name: 'new_name',
    description: 'new_desc',
    creationDate: '2015-11-21',
    admin: 3, 
    city: 3
  };

  var updatedInvestment = {
    name: 'updated_name',
    description: 'updated_desc',
    creationDate: '2015-12-23',
    admin: 2,
    city: 2
  };

  it('should return investment with id: 1', function(done){
      request(app)
        .get('/api/investments/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');
          res.body.data.should.not.be.instanceof(Array);
          
          res.body.data.id.should.equal(1);          
          res.body.data.name.should.equal('investment_test');
          res.body.data.description.should.equal('investment_description');
          res.body.data.admin.should.equal(1);
          res.body.data.city.should.equal(1);
          done();
        });
  });

  it('should create new investment', function(done){
      request(app)
        .post('/api/investments')
        .send(investment)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })
  });

  it('should return all investments', function(done){
      request(app)
        .get('/api/investments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          
          if(err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.status.should.equal('ok');
          res.body.data.should.be.instanceof(Array);
          res.body.data.length.should.equal(2);
          done();
        });
  });

  it('should update investment with id = 2', function(done){
      request(app)
        .put('/api/investments/2')
        .send(updatedInvestment)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })   
  });

  it('should delete investment from database', function(done){
      request(app)
        .delete('/api/investments/2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if(err) return done(err);

          res.body.status.should.equal("ok");
          done();
        })     
  });

  it('should return all posts owned by investment #1', function(done){
  		request(app)
  			.get('/api/investments/1/posts')
  			.expect(200)
  			.expect('Content-Type', /json/)
  			.end(function(err, res){
  				if(err) return done(err);

  				res.body.status.should.equal("ok");

  				res.body.data.should.be.instanceof(Array);
  				// res.body.data.length.should.equal()
  				done();
  			});
  });

  after(function(done){
    db.cleanTableForTest("investment", function(err){
      if(err) return done(err);
  
      done();
    });
  });

});