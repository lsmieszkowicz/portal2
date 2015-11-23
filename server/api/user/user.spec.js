'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('User API test', function(){
	
	var userUpdate = {
		login: 'newAdmin',
		name: 'newAdminName',
		surname: 'newAdminSurname',
		email: 'newEmail@domain.com',
		password: 'newpass'
	};

	it('should return all users', function(done){
		request(app)
		.get('/api/users')
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

	it('should return user with id: 1', function(done){
		request(app)
		.get('/api/users/1')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res){
			if(err) return done(err);

			res.body.data.id.should.equal(1);
			res.body.data.login.should.equal('test');
			res.body.data.name.should.equal('test_name');
			res.body.data.surname.should.equal('test_surname');
			res.body.data.email.should.equal('login@domain.com');
			
			done();
		});
	});

	it('should update user with id: 2', function(done){
		request(app)
		.put('/api/users/2')
		.send(userUpdate)
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res){
			if(err) return done(err);

			done();
		});
	});

	// it('should delete user with id 2', function(done){
	// 	request(app)
	// 	.delete('/api/users/2')
	// 	.expect(200)
	// 	.expect('Content-Type', /json/)
	// 	.end(function(err, res){
	// 		if(err) return done(err);

	// 		done();
	// 	});
	// });

});