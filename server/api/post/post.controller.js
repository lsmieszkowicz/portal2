'use strict';

var _ = require('lodash');
var Post = require('./post.model');

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