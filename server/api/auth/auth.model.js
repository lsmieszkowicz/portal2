'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports = {

	login: function(loginData, callback){
		var login = loginData.login;
		var password = loginData.password;

		var sql = 'SELECT id, login, name, surname, email FROM user WHERE login = ? AND PASSWORD = ?';

		connection.query(sql, [login, password], function(err, rows, fields) {
			if(err) throw err;

			callback(err, rows[0]);
		});
	},


	register: function(userData, callback){
		var sql = 'INSERT INTO user SET ?';
		connection.query(sql, userData, function(err, result){
			if(err) throw err;

			console.log(result);
			callback(err, result);
		});
	},

	findUserByLogin: function(userData, callback){
		var sql = 'SELECT * FROM user WHERE login = ?';
		connection.query(sql, [userData.login], function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	}
};