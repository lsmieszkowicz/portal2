/*
 * Database configuration
 */
 
'use strict';

var mysql = require('mysql');
var config = require('./config/environment');

var connection = mysql.createConnection(config.sql);

module.exports = {
	
	connection: connection,

	initTableForTest: function(tableName, obj, callback){
		
		connection.query("INSERT INTO ?? SET ?", [tableName, obj], function(err, result){
			if(err) return err;

			callback();
		});
	},

	cleanTableForTest: function(tableName, callback){
		
		var query = connection.query("DELETE FROM ?? WHERE id > 1", [tableName], function(err, result){
			if(err) return err;
			
			callback();
		});
	}
}