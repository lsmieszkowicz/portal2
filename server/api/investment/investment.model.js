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
		connection.query("SELECT * FROM post WHERE investment_id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);	
		});
	},

	getImages: function(id, callback){
		connection.query("SELECT * FROM image WHERE investment_id = ?", id, function(err, rows, fields){
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
		connection.query("INSERT INTO investment (name, description, admin, creationDate, city) VALUES (?, ?, ?, ?, ?)", [newInvestment.name, newInvestment.description, newInvestment.admin, newInvestment.creationDate, newInvestment.city], function(err, result){
	        callback(err, result);
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE investment SET name = ?, description = ?, admin = ? WHERE id = ?", [newData.name, newData.description, newData.admin, id], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	remove: function(id, callback){
		connection.query("DELETE FROM investment where id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	}
};




  