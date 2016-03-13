'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {
	
	getUserCities: function(id, callback){
		var sql = "SELECT * FROM city c \ 
				   LEFT JOIN follow_city f ON (f.city_id = c.id) \
				   WHERE f.user_id = ?";
		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},
	
	getCityFollowers: function(id, callback){
		var sql = "SELECT * FROM user u  \
				   LEFT JOIN follow_city f ON (f.user_id = u.id) \
				   WHERE f.city_id = ?";
		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},
	
	find: function(user, city, callback){
		var sql = "SELECT * FROM follow_city \
				   WHERE (user_id = ? AND city_id = ?)";

		connection.query(sql, [user, city] function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	},
	
	create: function(obj, callback){
		var sql = "INSERT INTO follow_city (city_id, user_id) VALUES (?, ?)";
		var values = [obj.city_id, obj.user_id];
		
		connection.query(sql, values, function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	},
	
	remove: function(id, callback){
		var sql = "DELETE FROM follow_city WHERE id = ?";
		connection.query(sql, id, function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	}
};