'use strict';

var _ = require('lodash');
var authModel = require('./auth.model');

exports.login = function(req, res){
	
	var loginData = req.body;

	authModel.login(loginData, function(){

	});

};

exports.register = function(req, res){
	
	var newUserData = req.body;

	authModel.register(newUserData, function(){

	});
};