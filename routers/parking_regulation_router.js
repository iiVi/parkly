var express  = require('express');
var models   = require('../models');
var Regulation = models.parking_regulations;
var request = require('request');

var regulationsRouter = express.Router();



regulationsRouter.get('/', function (req, res) {
	Regulation.findAll()
	.then(function(regulations) {
		res.send(regulations);
	});
});

regulationsRouter.post('/newpoop', function (req, res) {
	Regulation.create(req.body)
	.then(function(newRegulation) {
		res.send(newRegulation);
	});	
});

regulationsRouter.get('/search', function (req, res) {
	Regulation.findAll({where: req.query})
	.then(function(regulations) {
		res.send(regulations);
	});
});

regulationsRouter.get('/requestpoop', function (req, res) {
	request({
		uri: 'http://andrewcarton1.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20parking_regulationshp_1&api_key=a8614e1207568c75211faba281eda4f8d56c8164',
		method: 'get',
		json: true
	}, function (error, response, body) {
			var regulationsArray = body.features;
				regulationsArray.forEach(function (regulation) {
				var data = {
					object_id: regulation.properties.objectid,
					borough: regulation.properties.sg_key_bor,
					location_id: regulation.properties.sg_order_n,
					sign_sequence: regulation.properties.sg_seqno_n,
					curb_distance: regulation.properties.sr_dist,
					sign_code: regulation.properties.sg_mutcd_c,
					sign_faces: regulation.properties.sg_sign_fc,
					sign_arrow: regulation.properties.sg_arrow_d,
					sign_description: regulation.properties.signdesc1,
					cartodb_id: regulation.properties.cartodb_id,
					x: regulation.geometry.coordinates[1],
					y: regulation.geometry.coordinates[0]
				};
				request({
					url: "http://localhost:9888/regulations/newpoop",
					method: 'post',
					data: data
				}, function(error, response, body) {
					console.log("got here")
					res.send(body)
				})
			})
	})
});

regulationsRouter.post('/requestpoop', function (req, res) {
	request({
		uri: 'http://andrewcarton1.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20parking_regulationshp_1&api_key=a8614e1207568c75211faba281eda4f8d56c8164',
		method: 'get',
		json: true
	}, function (error, response, body) {
			var regulationsArray = body.features;
				regulationsArray.forEach(function (regulation) {
					console.log('doing something to each of these stuffz');
					var data = {
						object_id: regulation.properties.objectid,
						borough: regulation.properties.sg_key_bor,
						location_id: regulation.properties.sg_order_n,
						sign_sequence: regulation.properties.sg_seqno_n,
						curb_distance: regulation.properties.sr_dist,
						sign_code: regulation.properties.sg_mutcd_c,
						sign_faces: regulation.properties.sg_sign_fc,
						sign_arrow: regulation.properties.sg_arrow_d,
						sign_description: regulation.properties.signdesc1,
						cartodb_id: regulation.properties.cartodb_id,
						x: regulation.geometry.coordinates[1],
						y: regulation.geometry.coordinates[0]
					};
					debugger;
					Regulation.create(data)
					.then(function(newReg) {
						res.send(newReg);
					})
			})
	})
});

regulationsRouter.get('/:id', function (req, res) {
	Regulation.findAll(req.params.id)
	.then(function(regulation) {
		res.send(regulation);
	});
});




/*regulationsRouter.get('/thispoop', function (req, res) {
	$.ajax({
		url: 'https://andrewcarton1.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20parking_regulationshp_1&api_key=a8614e1207568c75211faba281eda4f8d56c8164',
		method: 'get'
	}).done(function(regulationsCarto) {
		for (var i = 0; i < regulationsCarto.length; i++) {
			Regulation.create({
				the_geom: regulationsCarto[i].features[0].geometry.coordinates,
				object_id: regulationsCarto[i].features[0].properties.objectid,
				borough: regulationsCarto[i].features[0].properties.sg_key_bor,
				location_id: regulationsCarto[i].features[0].properties.sg_order_n,
				sign_sequence: regulationsCarto.features[0].properties.sg_seqno_n,
				sign_code: regulationsCarto.features[0].properties.sg_mutcd_c,
				curb_distance: regulationsCarto.features[0].properties.sr_dist,
				sign_faces: regulationsCarto.features[0].properties.sg_sign_fc,
				sign_arrow: regulationsCarto.features[0].properties.sg_arrow_d,
				sign_description: regulationsCarto.features[0].properties.signdesc1,
				cartodb_id: regulationsCarto.features[0].properties.cartodb_id
			})
			.then(function(newRegulation) {
				res.send(newRegulation);
			});
		}
	})
});*/

module.exports = regulationsRouter;