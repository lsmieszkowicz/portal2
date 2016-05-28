'use strict';

var express = require('express');
var controller = require('./investment.controller');
var investment_update = require('../investment_update/investment_update.controller');

var router = express.Router();

router.get('/',                						 controller.getAll);
router.get('/:id',             						 controller.get);
router.get('/:id/posts',       						 controller.getPosts);
router.get('/:id/images',      						 controller.getImages);
router.get('/:id/updates', 							 investment_update.findUpdateByInvestmentId);
router.get('/findByAdmin/:id', 						 controller.findByAdmin);
router.get('/:id/map',								 controller.getMap);
router.post('/find',		   						 controller.find);
router.post('/',			   						 controller.create);
router.put('/:id',			   controller.authorize, controller.update);
router.patch('/:id', 								 controller.updateRank)
router.delete('/:id',		   controller.authorize, controller.remove);

module.exports = router;
