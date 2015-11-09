'use strict';

var express = require('express');
var controller = require('./follow.controller');

var router = express.Router();

router.get('/investment/:id', controller.getInvestmentFollowers);
router.get('/user/:id', controller.getUserInvestments);
router.post('/', controller.create);

module.exports = router;