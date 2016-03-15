'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {
	
	findByCityId: function(id, callback){
		var sql = "SELECT * FROM city_update i WHERE i.city_id = ? ";
		
		connection.query(sql, [id], function(err, rows, fields ){
			if(err) throw err;
			callback(err, rows);
		});
	},
	
	create: function(obj, callback){
		var sql = "INSERT INTO city_update SET ?";
		
		connection.query(sql, obj, function(err, result){
			if(err) throw err;
			callback(err, result);
		});
	},
	
	remove: function(id, callback){
		var sql = "DELETE FROM city_update WHERE id = ?";
		
		connection.query(sql, [id], function(err, result){
			if(err) throw err;
			callback(err, result);
		});
	}
};