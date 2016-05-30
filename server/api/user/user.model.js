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

	getProfileImage: function(id, callback){
		var sql = "SELECT i.*, r.uploaderId, r.creationDate FROM image i \
				   LEFT JOIN img_relation r ON (i.id = r.imgId) \
				   WHERE (r.imgOwner = ? ) AND (r.kind LIKE 'PROFILE_PHOTO')";

		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	},

	/*
		Trzeba przemyslec i przepisac ta metode
	*/
	update: function(id, newData, callback){

		console.log(newData);

		var sqlWithoutPassword = 'UPDATE user SET name = ?, surname = ? WHERE id = ?';
		var dataWithoutPass = [newData.name, newData.surname];

		var sqlWithPassword = 'UPDATE user SET name = ?, surname = ?, password = ? WHERE id = ?';
		var dataWithPass = [newData.name, newData.surname, newData.password];

		var sql = '';
		var data = [];

		if(newData.password){
			sql = sqlWithPassword;
			data = dataWithPass;
		}
		else {
			sql = sqlWithoutPassword;
			data = dataWithoutPass;
		}

		console.log(sql);
		console.log(data);

		data.push(id);
		connection.query(sql, data, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	updateRank: function(id, value, callback){
		value = parseInt(value);
		var sql = "UPDATE user SET rank = rank + ? WHERE id = ?";
		connection.query(sql, [value, id], function(err, result){
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