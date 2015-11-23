'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var db = require('../../database');

describe('Follow API test', function(){

	var newFollow = {
		id: 10,
		investment_id: 4,
		user_id: 4
	};

	it('should return all followers of investment with id 1', function(done){
		request(app)
			.get('/api/follow/investment/1')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if(err) return done(err);

				res.body.should.be.instanceof(Object);
				res.body.status.should.equal('ok');

				res.body.data.should.be.instanceof(Array);
				res.body.data.length.should.equal(3);	
				done();
			})
	})

	it('should return all investments followerd by user with id 1', function(done){
		request(app)
			.get('/api/follow/user/1')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if(err) return done(err);

				res.body.should.be.instanceof(Object);
				res.body.status.should.equal('ok');

				res.body.data.should.be.instanceof(Array);
				res.body.data.length.should.equal(2);	
				done();
			})
	})

	it('should create new follow relation', function(done){
		request(app)
			.post('/api/follow')
			.send(newFollow)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if(err) return done(err);

				res.body.should.be.instanceof(Object);
				res.body.status.should.equal('ok');
				done();
			})
	})

});