'use strict';

var express = require('express');
var controller = require('./region.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/cities/', controller.getCities);

module.exports = router;