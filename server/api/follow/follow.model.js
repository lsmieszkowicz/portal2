'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {
	
	getInvestmentFollowers: function(id, callback){
		connection.query("SELECT user_id FROM follow WHERE investment_id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows); 
		});
	},

	getUserInvestments: function(id, callback){
		connection.query("SELECT investment_id FROM follow WHERE user_id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	find: function(findParams, callback){
		var sql = "SELECT id FROM follow WHERE (investment_id = ? AND user_id = ? )";

		connection.query(sql, [findParams.invId, findParams.userId], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	},

	create: function(newFollow, callback){
		connection.query("INSERT INTO follow (investment_id, user_id) VALUES (?, ?)", [newFollow.investment_id, newFollow.user_id], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	remove: function(id, callback){
		connection.query('DELETE FROM follow WHERE id = ?', id, function(err, result){
			if(err) throw err;

			callback(err, result);
		})
	}
};