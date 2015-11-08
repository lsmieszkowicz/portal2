'use strict';

var _ = require('lodash');
var Investment = require('./investment.model');

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
	
	Investment.update(putData, function(err){
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

	Investment.remove(putData, function(err){
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
