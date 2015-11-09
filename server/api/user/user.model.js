'use strict';

var db = require('../../database');
var connection = db.connection;


module.exports = {
	
	get: function(id, callback){
		connection.query("SELECT id, login, name, surname, email FROM user WHERE id = ?", [id] , function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]); 
		});
	},

	getAll: function(callback){
		connection.query("SELECT id, login, name, surname, email FROM user", function(err, rows, fields){
			if(err) throw err;

			callback(err, rows); 
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE user SET login = ?, name = ?, surname = ?, email = ? password = ? WHERE id = ?", [newData.login, newData.name, newData.surname, newData.email, newData.password, id], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	remove: function(id, callback){
		connection.query("DELETE FROM user where id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	}
};