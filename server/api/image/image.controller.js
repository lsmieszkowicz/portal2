'use strict';

var _ = require('lodash');
var multer = require('multer');
var config = require('../../config/environment');

exports.uploadHandler = multer({
	 dest: 'client/assets/images/uploaded' 
});

// Get list of images
exports.upload = function(req, res) {
  
  var file = req.body;

  console.log('udalo sie');

  res.json({
  	text: "udalo sie"
  });
};