var express  = require('express');
var models   = require('../models');
var StreetCode = models.street_codes;

var streetCodeRouter = express.Router();

streetCodeRouter.get('/', function (req, res) {
	//Location.findAll()
	StreetCode.findAll()
	.then(function(locations) {
		res.send(locations);
	});
});

streetCodeRouter.get('/poop', function (req, res) {
	StreetCode.findAll({where: {street_name: 'BEDFORD AVENUE'}})
	.then(function(locations) {
		res.send(locations);
	});
});

streetCodeRouter.get('/search', function (req, res) {
	StreetCode.findAll({where: req.query})
	.then(function(streetCodes) {
		res.send(streetCodes);
	});
});

streetCodeRouter.get('/search_cross', function (req, res) {
	StreetCode.findAll({where: {
		on_street: req.query.on_street,
		$or: [{cross_street_one: req.query.cross_street}, 
			  {cross_street_two: req.query.cross_street}]
	}})
	.then(function(locations) {
		res.send(locations)
	});
});

module.exports = streetCodeRouter;