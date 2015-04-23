var express  = require('express');
var models   = require('../models');
var Location = models.locations;
var Parking_regulation = models.parking_regulations;

var locationRouter = express.Router();



locationRouter.get('/', function (req, res) {
	//Location.findAll()
	Location.findAll({ include: [Parking_regulation] })
	.then(function(locations) {
		res.send(locations);
	});
});

locationRouter.get('/poop', function (req, res) {
	Location.findAll({where: {id: 'S-099213'}, include: [Parking_regulation]  })
	.then(function(locations) {
		res.send(locations);
	});
});

locationRouter.get('/search', function (req, res) {
	Location.findAll({where: req.query, include: [Parking_regulation] })
	.then(function(location) {
		res.send(location);
	});
});

locationRouter.get('/search_cross', function (req, res) {
	Location.findAll({where: {
		on_street: req.query.on_street,
		$or: [{cross_street_one: req.query.cross_street}, 
			  {cross_street_two: req.query.cross_street}]
	}})
	.then(function(locations) {
		res.send(locations)
	});
});

module.exports = locationRouter;