'use strict';

var _ = require('lodash');
var User = require('./user.model');


exports.get = function(req, res) {
	var id = req.params.id;
	
	User.get(id, function(err, data){
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
	
	User.getAll(function(err, data){
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

exports.getProfileImage = function(req, res){
	var id = req.params.id;

	User.getProfileImage(id, function(err, data){
		if(err){
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

exports.update = function(req, res) {
	var id = req.params.id;
	var putData = req.body;
	
	User.update(id, putData, function(err){
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

exports.updateRank = function(req, res){
	var body = req.body;
	User.updateRank(req.params.id, body.rank, function(err, data){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else{
			res.json({
				status: 'ok',
				data: data
			});
		}
	});
}

exports.remove = function(req, res) {
	var id = req.params.id;
	
	User.remove(id, function(err){
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