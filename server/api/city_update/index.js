'use strict';

var express = require('express');
var controller = require('./city_update.controller');

var router = express.Router();

router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;