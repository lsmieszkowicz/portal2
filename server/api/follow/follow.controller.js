'use strict';

var _ = require('lodash');
var Follow = require('./follow.model');


exports.getInvestmentFollowers = function(req, res) {
	var id = req.params.id;

	Follow.getInvestmentFollowers(id, function(err, data){
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

exports.getUserInvestments = function(req, res) {
	var id = req.params.id;

	Follow.getUserInvestments(id, function(err, data){
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

	Follow.create(postData, function(err){
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