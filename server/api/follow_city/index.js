'use strict';

var express = require('express');
var controller = require('./follow_city.controller');

var router = express.Router();

router.post('/find', controller.find);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;