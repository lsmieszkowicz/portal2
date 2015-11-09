'use strict';

var express = require('express');
var controller = require('./post.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;