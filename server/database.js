/*
 * Database configuration
 */
 
'use strict';

var mysql = require('mysql');
var config = require('./config/environment');

var connection = mysql.createConnection(config.sql);

module.exports = {
	connection: connection
}