'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/profile_image', controller.getProfileImage);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;