'use strict';

var db = require('../../database');
var connection = db.connection;

module.exports.get = function(){

	connection.query('SELECT * FROM investment', function(err, rows, fields) {
		if (err) throw err;
		console.log('Db select: ', rows);
	});	
}



  