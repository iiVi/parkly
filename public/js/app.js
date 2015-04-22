var map;
$(function() {
	console.log('loaded bro');

	$('#input-container').on('click', 'button', search);

//why does this only work when it is a global variable???

	map = L.map('map', {
      'center': [40.7411, -73.9897],
      'zoom': 15
	});

	L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    mapId: 'iivi.f1e12c0a',
	    token: 'pk.eyJ1IjoiaWl2aSIsImEiOiJTS25vbUQ4In0.iyDNlR19Josj6y07qF71DA'
	}).addTo(map);
/*	
	cartodb.createLayer(map, 'https://andrewcarton1.cartodb.com/api/v2/viz/66e4b0da-e82d-11e4-9ade-0e5e07bb5d8a/viz.json')
	.addTo(map);*/

	cartodb.createLayer(map, 'https://andrewcarton1.cartodb.com/api/v2/viz/66e4b0da-e82d-11e4-9ade-0e5e07bb5d8a/viz.json')
            .addTo(map)
         .on('done', function(layer) {
          layer.setInteraction(true);
          layer.on('featureOver', function(e, latlng, pos, data) {
            cartodb.log.log(e, latlng, pos, data);
          });
          layer.on('error', function(err) {
            cartodb.log.log('error: ' + err);
          });
        }).on('error', function() {
          cartodb.log.log("some error occurred");
        });
});
	addMarker = function () {
		var marker = L.marker([40.7411, -73.9897]).addTo(map);
	};

	addCircle = function () {
		var circle = L.circle([40.7411, -73.9897], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map);
	};


/*var showSigns = function (feature, layer) {
	layer.bindPopup('Hi I am a popup');
};

L.geoJson(parkingRegulations, {
	onEachFeature: showSigns
}).addTo(map);*/


//funciton to add shapes, etc to map;  why only works with global variables???


//end initialize function 


/*var testGet = function (id) {
	$.ajax ({
		url: '/regulations/poop/' + id,
		method: 'get'
	}).done(testConvert);
};

var testConvert = function (regulation) {
	var lat = st_asText(regulation.the_geom);
	//var long = st_x(regulation.the_geom);

	console.log(lat + '   and   ');
};*/



var test = function () {

	$.get("http://andrewcarton1.cartodb.com/api/v2/viz/66e4b0da-e82d-11e4-9ade-0e5e07bb5d8a/sql?q=select st_y(the_geom) as lat, st_x(the_geom) as lon from TABLE", function(data) {
	  for(var i = 0; i < data.rows.length; ++i) {
	     var row = data.rows[i];
	     console.log("point", row.lat, row.lon);
	  }
	});
}




var search = function () {

	var onStreet = $('#on-street').val();
	
	$.ajax({
		url: '/locations/search?on_street=' + onStreet,
		method: 'get'
	})
	.done(renderCrossStreets);
};

var renderCrossStreets = function (locations) {
	for (var i = 0; i < locations.length; i ++) {
		var cross1 = locations[i].cross_street_one;
		var dropDownItem = $('<option>').attr('value', cross1).html(cross1);
		$('#cross-street-1').append(dropDownItem);
	};
};


var searchCross = function () {
	var onStreet = $('#on-street').val();
	var crossStreet = $('#cross-street-1').val();

	$.ajax({
		url: '/locations/search_cross?on_street=' + onStreet + '&cross_street=' + crossStreet,
		method: 'get'

	})
	.done(renderCross);
};

var renderCross = function (locations) {
	var onStreet = $('#on-street').val();
	var crossStreet = $('#cross-street-1').val();
	for (var i = 0; i < locations.length; i++) {
		if (locations[i].cross_street_one === crossStreet) {
			var cross2 = locations[i].cross_street_two;
			var dropDownItem = $('<option>').attr('value', cross2).html(cross2);
			$('#cross-street-2').append(dropDownItem);
		} else if (locations[i].cross_street_two === crossStreet) {
			var cross2 = locations[i].cross_street_one;
			var dropDownItem = $('<option>').attr('value', cross2).html(cross2);
			$('cross-street-2').append(dropDownItem);
		};
	};
};
