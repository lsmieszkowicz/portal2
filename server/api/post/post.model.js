'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {
	get: function(id, callback){
		connection.query("SELECT * FROM post WHERE id = ?", [id] , function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]); 
		});
	},

	getAll: function(callback){
		connection.query("SELECT * FROM post", function(err, rows, fields){
			if(err) throw err;

			callback(err, rows); 
		});
	},

	create: function(newPost, callback){
		connection.query("INSERT INTO post (content, author, investment_id) VALUES (?, ?, ?)", [newPost.content, newPost.author, newPost.investment_id], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE post SET content = ?, author = ?, investment_id = ? WHERE id = ?", [newData.content, newData.author, newData.investment_id, id], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});	
	},

	remove: function(id, callback){
		connection.query("DELETE FROM post where id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	}
};