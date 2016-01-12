'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var multer = require('multer');
var config = require('../../config/environment');

exports.uploadHandler = multer({
	 dest: 'client/assets/images/uploaded'
});

// Get list of images
exports.upload = function(req, res) {
  	
  	var imageData = {
  		path: 'assets/images/uploaded/' +  req.file.filename,
  		text: req.body.text
  	};

	Image.createImage(imageData, function(err, result){
		
		if(err){
			res.json({
				status: 'error',
				error: err
			});
		}
		else{

			var relationData = {
		  		imgId: result.insertId,
		  		imgOwner: req.body.imgOwner,
		  		kind: req.body.kind,
		  		uploaderId: req.body.uploaderId,
		  		creationDate: req.body.creationDate
		  	}

			Image.createImageRelation(relationData, function(relErr, relResult){
				
				if(relErr) {
					res.json({
						status: 'error',
						error: relErr
					});	
				}
				else{
					res.json({
						status: 'ok',
						img: imageData
					});	
				}
			});
		}
	});
};