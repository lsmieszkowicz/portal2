'use strict';

var _ = require('lodash');
var Region = require('./region.model');

exports.getAll = function(req, res) {
	
	Region.getAll(function(err, data){
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

exports.get = function(req, res){
	
	var id = req.params.id;

	Region.get(id, function(err, data){
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

exports.getCities = function(req, res) {
	var id = req.params.id;

	Region.getCities(id, function(err, data){
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