'use strict';

var model = require('./follow_city.model');
var _ = require('lodash');

exports.getUserCities = function(req, res){
	var id = req.params.id;

	model.getUserCities(id, function(err, data){
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
};

exports.getCityFollowers = function(req, res){

	var id = req.params.id;

	model.getCityFollowers(id, function(err, data){
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
};

exports.find = function(req, res){

	var user_id = req.body.user_id;
	var city_id = req.body.city_id;

	model.find(user_id, city_id, function(err, data){
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
};

exports.create = function(req, res){

	var obj = req.body;

	model.create(obj, function(err, result){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else{
			res.json({
				status: 'ok',
				data: result
			});
		}
	});
};

exports.remove = function(req, res){
	var id = req.params.id;

	model.remove(id, function(err, result){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else{
			res.json({
				status: 'ok',
				data: result
			});
		}
	});
};