'use strict';

var _ = require('lodash');
var Investment = require('./investment.model');
var Post = require('../post/post.model');
var Image = require('../image/image.model');
var Investment_update = require('../investment_update/investment_update.model.js');
var Follow = require('../follow/follow.model');
var jwt = require('jsonwebtoken');

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
	
	Investment.update(id, putData, function(err, data){
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
	
	// usun wszystkie posty powiazane z inwestycja
	Investment.getPosts(id, function(err, posts){
		for(var i in posts){
			console.log(posts);
			Post.remove(posts[i].id, function(err, result){
				console.log('post #' + posts[i].id + ' deleted');
			});
		}
	});

	// usun wszystkie img_relation zwiazane z inwestycja (DODAC USUWANIE SAMYCH ZDJEC)
	Investment.getImages(id, function(err, images){
		for(var i in images){
			console.log(images);
			Image.removeImageRelation(images[i].id, function(err, result){
				console.log('img #' + images[i].id + ' relation deleted');
			});
		}	
	});	
	
	// usun wszystkie update'y zwiazane z inwestycja
	Investment_update.findByInvestmentId(id, function(err, updates){
		for(var i in updates){
			Investment_update.remove(updates[i].id, function(err, result){
				console.log('update #' + updates[i].id + 'deleted');
			});
		}	
	});	

	//usuwanie relacji follow
	Follow.findByInvestmentId(id, function(err, follow_relations){
		for(var i in follow_relations){
			Follow.remove(follow_relations[i].id, function(err, result){
				console.log('follow relation # ' + follow_relations[i].id + 'deleted');
			});
		}
	});

	Investment.remove(id, function(err){
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

exports.authorize = function(req, res, next){
	var token = req.headers.authorization;
		
	if(!token) 
		res.status(401).send('Unauthorized');
		
	token = token.replace('Bearer ', '');
	var id = req.params.id;

	var decoded = jwt.decode(token);
	
	Investment.get(id, function(err, data){
		console.log(data);
		if(!err) {
			if(decoded.id === data.admin)
				next();
			else
				res.status(401).send('Unauthorized');
		}
		else {
			res.json({
				status: 'error',
				error: err
			});
		}		
	});

}
