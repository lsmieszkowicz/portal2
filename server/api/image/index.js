'use strict';

var express = require('express');
var controller = require('./image.controller');

var router = express.Router();
var type = controller.uploadHandler.single('file');

router.post('/upload', type, controller.upload);

module.exports = router;