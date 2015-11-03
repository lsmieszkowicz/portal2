'use strict';

var express = require('express');
var controller = require('./investment.controller');

var router = express.Router();

router.get('/api/investment',                 controller.getAll);
router.get('/api/investment/:id',             controller.get);
router.get('/api/investment/:id/posts',       controller.getPosts);
router.get('/api/investment/:id/images',      controller.getImages);
router.get('/api/investment/findByAdmin/:id', controller.findByAdmin);
router.post('/api/investment/find',			  controller.find);
router.post('/api/investment',			      controller.create);
router.put('/api/investment/:id',			  controller.update);
router.delete('/api/investment/:id',		  controller.remove);
module.exports = router;