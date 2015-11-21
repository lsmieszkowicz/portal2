'use strict';

var _ = require('lodash');
var City = require('./city.model');


exports.get = function(req, res) {
	var id = req.params.id;
	
	City.get(id, function(err, data){
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
	City.getAll(function(err, data){
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
	
	City.create(postData, function(err){
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
	
	City.update(id, putData, function(err, data){
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

exports.remove = function(req, res) {
	var id = req.params.id;  

	City.remove(id, function(err, data){
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