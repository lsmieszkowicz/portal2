'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var jwt = require('jsonwebtoken');

exports.get = function(req, res) {
	var id = req.params.id;
	
	Post.get(id, function(err, data){
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

exports.getAll = function(req, res) {
	
	Post.getAll(function(err, data){
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
	
	Post.create(postData, function(err, data){
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
	
	Post.update(id, putData, function(err){
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
	
	Post.remove(id, function(err){
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
	
	Post.get(id, function(err, data){
		console.log(data);
		if(!err) {
			if(decoded.id === data.author)
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

};