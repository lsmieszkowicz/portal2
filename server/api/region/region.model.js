'use strict';

var db = require('../../database');
var connection = db.connection;


module.exports = {
	
	getAll: function(callback) {
		connection.query("SELECT * FROM region", function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	getCities: function(id, callback) {
	
		connection.query("SELECT * FROM city WHERE region_id = ?", id, function(err, rows, fields) {
			if(err) throw err;
			
			callback(err, rows);
		});
	}

};