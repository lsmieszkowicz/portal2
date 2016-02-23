'use strict';

var express = require('express');
var controller = require('./investment.controller');

var router = express.Router();

router.get('/',                						 controller.getAll);
router.get('/:id',             						 controller.get);
router.get('/:id/posts',       						 controller.getPosts);
router.get('/:id/images',      						 controller.getImages);
router.get('/findByAdmin/:id', 						 controller.findByAdmin);
router.post('/find',		   						 controller.find);
router.post('/',			   						 controller.create);
router.put('/:id',			   controller.authorize, controller.update);
router.delete('/:id',		   controller.authorize, controller.remove);

module.exports = router;