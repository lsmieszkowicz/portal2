'use strict';

var _ = require('lodash');
var model = require('./investment_update.model');

exports.findUpdateByInvestmentId = function(req, res){
	var id = req.params.id;

	model.findByInvestmentId(id, function(err, result){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: result
			});
		}
	});
};

exports.create = function(req, res) {

	var update = req.body;
	update.timestamp = new Date();

	model.create(update, function(err, result){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: result
			});
		}
	});
};

exports.remove = function(req, res) {
	
	var id = req.params.id;

	model.remove(id, function(err, result){
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else {
			res.json({
				status: 'ok',
				data: result
			});
		}
	});
};