'use strict';

var db = require('../../database');
var connection = db.connection;


module.exports = {
	get: function(id, callback){
		connection.query("SELECT * FROM city WHERE id = ?", id, function(err, rows, fields) {
			if(err) throw err;

			callback(err, rows[0]);
		});
	},

	getAll: function(callback){
		connection.query("SELECT * FROM city", [], function(err, rows, fields) {
			if(err) throw err;
		
			callback(err, rows);
		});
	},

	getInvestments: function(id, callback){
		connection.query("SELECT * FROM investment WHERE city = ? ", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	create: function(newCity, callback){
		connection.query("INSERT INTO city SET ?", newCity, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE city SET name = ?, region_id = ?, admin_id = ? WHERE id = ?", [newData.name, newData.region_id, newData.admin_id, id], function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	},

	remove: function(id, callback){
		connection.query("DELETE FROM city where id = ?", id, function(err, result){
			if(err) throw err;

			callback(err, result);
		});		
	}
};