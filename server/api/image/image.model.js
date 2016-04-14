'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {

	get: function(id, callback){
		var sql = 'SELECT * FROM image WHERE id = ?';

		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	}

	createImage: function(imgData, callback){

		var sql = 'INSERT INTO image SET ?';

		connection.query(sql, imgData, function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	}, 

	createImageRelation: function(relationData, callback){
		
		var sql = 'INSERT INTO img_relation SET ?';

		connection.query(sql, relationData, function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	}


}
