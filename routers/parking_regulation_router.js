var express  = require('express');
var models   = require('../models');
var Regulation = models.parking_regulations;

var regulationsRouter = express.Router();



regulationsRouter.get('/', function (req, res) {
	Regulation.findAll()
	.then(function(regulations) {
		res.send(regulations);
	});
});

regulationsRouter.get('/poop/:id', function (req, res) {
	Regulation.findOne(req.params.id)
	.then(function(regulation) {
		res.send(regulation);
	});
});

module.exports = regulationsRouter;