'use strict';

var express = require('express');
var controller = require('./post.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.authorize, controller.update);
router.delete('/:id', controller.authorize, controller.remove);

module.exports = router;