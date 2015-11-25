'use strict';

var _ = require('lodash');
var authModel = require('./auth.model');
var jwt = require('jsonwebtoken');

exports.login = function(req, res){
	
	var loginData = req.body;

	authModel.login(loginData, function(err, user){
		if(err) {
			res.json({
				status: "error",
				error: err
			});
		}
		else {
			if(user){
				var token = jwt.sign(user, process.env.SESSION_SECRET);
				
				res.json({
					status: 'ok',
					data: {
						user: user,
						token: token
					}
				});
			}
			else{
				res.json({
					status: 'nouser',
				});
			}
		}
	});

};

exports.register = function(req, res){
	
	var newUserData = req.body;

	authModel.register(newUserData, function(){

	});
};