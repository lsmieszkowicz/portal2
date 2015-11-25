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

			calback(err, rows[0]);
		});
	},


	register: function(newUserData, callback){

	}
};