'use strict';

var _ = require('lodash');
var Investment = require('./investment.model');
var jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
	
	Investment.getAll(function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}
	});
};

exports.get = function(req, res) {
	var id = req.params.id;
	
	Investment.get(id, function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}		
	});
};

exports.getPosts = function(req, res) {
	var id = req.params.id;
	
	Investment.getPosts(id, function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}
	});
};

exports.getImages = function(req, res) {
	var id = req.params.id;
	
	Investment.getImages(id, function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}
	});
};

exports.findByAdmin = function(req, res) {
	var adminId = req.params.id;
	Investment.findByAdmin(adminId, function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}
	});
};

exports.find = function(req, res) {
	var searchParams = req.body;
	
	Investment.find(searchParams, function(err, data){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: data
			});	
		}
	});
};

exports.create = function(req, res) {
	var postData = req.body;
	
	Investment.create(postData, function(err){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
			});	
		}
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	var putData = req.body;
	
	Investment.update(id, putData, function(err){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
			});	
		}
	});
	
};

exports.remove = function(req, res) {
	var id = req.params.id;

	Investment.remove(id, function(err){
		if(err) {
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
			});	
		}
	});		
};

exports.authorize = function(req, res, next){
	var token = req.headers.authorization;
		
	if(!token) 
		res.status(401).send('Unauthorized');
		
	token = token.replace('Bearer ', '');
	var id = req.params.id;

	var decoded = jwt.decode(token);
	
	Investment.get(id, function(err, data){
		console.log(data);
		if(!err) {
			if(decoded.id === data.admin)
				next();
			else
				res.status(401).send('Unauthorized');
		}
		else {
			res.json({
				status: 'error',
				error: err
			});
		}		
	});

}
