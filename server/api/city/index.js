'use strict';

var express = require('express');
var controller = require('./city.controller');
var follow_city = require('../follow_city/follow_city.controller');
var city_update = require('../city_update/city_update.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/investments', controller.getInvestments);
router.get('/:id/followers', follow_city.getCityFollowers);
router.get('/:id/updates', city_update.findUpdateByCityId);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;