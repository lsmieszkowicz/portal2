'use strict';

var db = require('../../database');
var connection = db.connection;


module.exports = {
	
	get: function(id, callback){
		connection.query("SELECT * FROM investment WHERE id = ?", [id] , function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	},

	getAll: function(callback){
		connection.query("SELECT * FROM investment", function(err, rows, fields){
			if(err) throw err;

			callback(err, rows); 
		});
	},

	getPosts: function(id, callback){
		connection.query("SELECT * FROM post WHERE investment_id = ? ORDER BY creationDate DESC", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);	
		});
	},

	getImages: function(id, callback){
		
		var sql = "SELECT i.*, r.uploaderId, r.creationDate FROM image i     \
				   LEFT JOIN img_relation r ON (i.id = r.imgId) \
				   WHERE (r.imgOwner = ? ) AND (r.kind LIKE 'INVESTMENT_PHOTO')";

		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	find: function(searchParams, callback){
		var sql = " SELECT i.id, i.name, i.description FROM investment i \
			        LEFT JOIN city c ON (i.city = c.id) \
			        WHERE (i.name LIKE ?) AND (c.name LIKE ?) AND (c.region_id = ?) ";

		var values = ['%'+searchParams.name+'%', searchParams.city, searchParams.region];

		connection.query(sql, values, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	findByAdmin: function(id, callback){
		connection.query("SELECT * FROM investment WHERE admin = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});

	},

	create: function(newInvestment, callback){
		connection.query("INSERT INTO investment SET ?", newInvestment, function(err, result){
	        callback(err, result);
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE investment SET name = ?, description = ?, admin = ? WHERE id = ?", [newData.name, newData.description, newData.admin, id], function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	},

	remove: function(id, callback){
		connection.query("DELETE FROM investment where id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	}
};




  