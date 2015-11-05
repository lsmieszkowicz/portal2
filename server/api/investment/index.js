'use strict';

var express = require('express');
var controller = require('./investment.controller');

var router = express.Router();

router.get('/',                controller.getAll);
router.get('/get',             controller.get);
router.get('/:id/posts',       controller.getPosts);
router.get('/:id/images',      controller.getImages);
router.get('/findByAdmin/:id', controller.findByAdmin);
router.post('/find',		   controller.find);
router.post('/',			   controller.create);
router.put('/:id',			   controller.update);
router.delete('/:id',		   controller.remove);

module.exports = router;