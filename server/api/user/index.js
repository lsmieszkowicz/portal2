'use strict';

var express = require('express');
var controller = require('./user.controller');
var follow_city = require('../follow_city/follow_city.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/profile_image', controller.getProfileImage);
router.get('/:id/cities', follow_city.getUserCities);
router.put('/:id', controller.update);
router.patch('/:id', controller.updateRank);
router.delete('/:id', controller.remove);

module.exports = router;