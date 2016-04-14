'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {
	
	findByInvestmentId: function(id, callback){
		var sql = "SELECT * FROM investment_update i WHERE i.investment_id = ? ";
		
		connection.query(sql, [id], function(err, rows, fields ){
			if(err) throw err;
			
			callback(err, rows);
		});
	},
	
	create: function(obj, callback){
		var sql = "INSERT INTO investment_update SET ?";
		
		connection.query(sql, obj, function(err, result){
			if(err) throw err;
			
			callback(err, result);
		});
	},
	
	remove: function(id, callback){
		var sql = "DELETE FROM investment_update WHERE id = ?";
		
		connection.query(sql, [id], function(err, result){
			if(err) throw err;
			
			callback(err, result);
		});
	}
};