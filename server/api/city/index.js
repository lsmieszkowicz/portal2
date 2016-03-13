'use strict';

var express = require('express');
var controller = require('./city.controller');
var follow_city = require('../follow_city/follow_city.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/investments', controller.getInvestments);
router.get('/:id/cities', follow_city.getUserCities);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;