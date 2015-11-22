'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var db = require('../../database');

describe('Post API test', function(){

	it('should return all regions', function(done){
		request(app)
			.get('/api/regions')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if(err) return done(err);

				res.body.should.be.instanceof(Object);
				res.body.status.should.equal("ok");
				res.body.data.should.be.instanceof(Array);
				res.body.data.length.should.equal(16);
				done();
			});
	});

	it("should return all region's cities" , function(done){
		request(app)
			.get('/api/regions/1/cities')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if(err) return done(err);

				res.body.should.be.instanceof(Object);
				res.body.status.should.equal("ok");
				res.body.data.should.be.instanceof(Array);
				res.body.data.length.should.equal(1);
				done();
			});
	});
}); 
