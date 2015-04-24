var map;
$(function() {
	console.log('loaded bro');
	$('#input-container').on('click', '#get-cross', getCrossStreets);
	$('#input-container').on('click', '#submit-block', search);
	$('body').on('change', '#cross-street-1', searchCross2);
	$('#input-container').on('click', '#find-tickets', findStreetCodes);
	ticTemplate = Handlebars.compile($('#ticket-template').html());

	map = L.map('map', {
      'center': [40.7411, -73.9897],
      'zoom': 15
	});
	L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    mapId: 'iivi.f1e12c0a',
	    token: 'pk.eyJ1IjoiaWl2aSIsImEiOiJTS25vbUQ4In0.iyDNlR19Josj6y07qF71DA'
	}).addTo(map);
});

var addRegsToMap = function (sign) {
	map.setView(new L.LatLng(sign.lat, sign.long), 17);
	var marker = L.marker([sign.lat, sign.long]).addTo(map);
	marker.valueOf()._icon.style.color = 'green';
	marker.bindPopup('<p>Sign Description: ' + sign.desc).openPopup();

};

var findStreetCodes = function (onStreet, cross1, cross2) {
	var onStreet = encodeURI($('#on-street').val().toUpperCase());
	var cross1 = encodeURI($('#cross-street-1').val().replace(/\s+/g,' ').trim());
	var cross2 = encodeURI($('#cross-street-2').val().replace(/\s+/g,' ').trim());
	var streetsCodes = {
		onStreetCode: [],
		cross1Code: [],
		cross2Code: []
	};
	$.ajax({
		url: '/streetcodes/search?street_name=' + onStreet,
		method: 'get'
	}).done(function (streetCode) {
		for (var i = 0; i < streetCode.length; i++) {
			if (streetCode[i].street_code.toString()[0] === '3') {
				streetsCodes.onStreetCode.push(streetCode[i].street_code);
			}
		};
		$.ajax({
			url: '/streetcodes/search?street_name=' + cross1,
			method: 'get'
		}).done(function (streetCode1) {
			for (var i = 0; i < streetCode1.length; i++) {
				if (streetCode1[i].street_code.toString()[0] === '3') {
					streetsCodes.cross1Code.push(streetCode1[i].street_code);
				}
			};
			$.ajax({
				url: '/streetcodes/search?street_name=' + cross2,
				method:'get'
			}).done(function (streetCode2) {
				for (var i = 0; i < streetCode2.length; i++) {
					if (streetCode2[i].street_code.toString()[0] === '3') {
						streetsCodes.cross2Code.push(streetCode2[i].street_code);
					}
				};
				console.log(streetsCodes);
				findTickets(streetsCodes);
			});
		});
	});
};

var findTickets = function (streetCodes) {
	var violations = [];
	var onStreet = parseInt(streetCodes.onStreetCode.toString().slice(1));
	var cross1 = parseInt(streetCodes.cross1Code.toString().slice(1));
	var cross2 = parseInt(streetCodes.cross2Code.toString().slice(1));
	var searchQuery = 'https://data.cityofnewyork.us/resource/jt7v-77mi.json?$where=';
	
	$.ajax({
		url: searchQuery + 'street_code1=' + onStreet + '%20AND%20' + 'street_code2=' + cross1 + '%20AND%20' + 'street_code3=' + cross2,
		method: 'get'
	}).done(function (violations1) {
		violations.push(violations1);
		$.ajax({
			url: searchQuery + 'street_code1=' + onStreet + '%20AND%20' + 'street_code3=' + cross1 + '%20AND%20' + 'street_code2=' + cross2,
			method: 'get'
		}).done(function (violations2) {
			violations.push(violations2);
			console.log(violations);
			renderTickets(violations);
		})
	});
};

var renderTickets = function (violations) {
	var ticketInfo = {};
	$('#map').css('width', '70%').css('margin-right', '30%');
	for (var i = 0; i < violations.length; i++) {
		if(violations[i].length > 0) {
			for (var j = 0; j < violations[i].length; j++) {
				var regCode = encodeURI(violations[i][j].violation_code);
					ticketInfo.house_number = violations[i][j].house_number;
					ticketInfo.street_name = violations[i][j].street_name;
					ticketInfo.violation_time = violations[i][j].violation_time;
					ticketInfo.issue_date = violations[i][j].issue_date;
				if (regCode == 38) {
					var regCode = 37 + '-' + 38;
				}
				$.ajax({
					url: 'https://data.cityofnewyork.us/resource/ncbg-6agr.json?code=' + regCode,
					method: 'get'
				}).done(function(reg) {
					ticketInfo.definition = reg[0].definition;
					ticketInfo.all_other_areas = reg[0].all_other_areas;
					var ticketListItem = $('<li>').html(ticTemplate(ticketInfo));
					ticketListItem.appendTo($('#tickets-container'));
				});
			}
		}
	}
};


var addTixToMap = function () {
	//find tickets on the on_street and cross street as cross1 or cross2, api call to openStreets to get lat long
	//for the intersections, place markers on map of a dif color, and when hovered/clicked, contain the violaiton info
};





/*
var	addMarker = function (info) {
	for (var i = 0; i < info.length)
	var marker = L.marker([info.lat, info.long]).addTo(map);
};*/

	addCircle = function () {
		var circle = L.circle([40.7411, -73.9897], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map);
	};


var testAdd = function () {
	$.ajax({
		url: 'http://andrewcarton1.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20parking_regulationshp_1&api_key=a8614e1207568c75211faba281eda4f8d56c8164',
		method: 'get'
	}).done(testAddData);
};

var testAddData = function (regulationsCarto) {
	var signs = regulationsCarto.features;

	signs.forEach(function  (sign) {
			$.ajax({
			url: '/regulations/newpoop',
			method: 'post',
			data: {
				object_id: sign.properties.objectid,
				borough: sign.properties.sg_key_bor,
				location_id: sign.properties.sg_order_n,
				sign_sequence: sign.properties.sg_seqno_n,
				curb_distance: sign.properties.sr_dist,
				sign_code: sign.properties.sg_mutcd_c,
				sign_faces: sign.properties.sg_sign_fc,
				sign_arrow: sign.properties.sg_arrow_d,
				sign_description: sign.properties.signdesc1,
				cartodb_id: sign.properties.cartodb_id,
				x: sign.geometry.coordinates[1],
				y: sign.geometry.coordinates[0]
			}
		}).done(function() {
			console.log('done with one');
		}).fail(function (textStatus) {
			alert(textStatus);
		})
	})
};

var search = function () {
	var onStreet = encodeURI($('#on-street').val().toUpperCase());
	var cross1 = $('#cross-street-1').val();
	var cross2 = $('#cross-street-2').val();
	var borough = $('#borough').val();
	var searchUrl = '/locations/search?on_street=' + onStreet + '&borough=' + borough + '&cross_street_one=' + cross1 + '&cross_street_two=' + cross2;
	$.ajax({
		url: searchUrl,
		method: 'get'
	}).done(getSignInfo)
};

var getSignInfo = function (location) {
	console.log('search location:' + location);
	var statusCodes = [];
	for (var i = 0; i < location.length; i++) {
		var regs = location[i].parking_regulations;
		for (var j = 0; j < regs.length; j++) {
			var signInfo = {
				lat: regs[i].x,
				long: regs[i].y,
				desc: regs[i].sign_description,
				arrow: regs[i].sign_arrow,
				seq: regs[i].sign_sequence
			};
			console.log('sign info: ' + signInfo);
			addRegsToMap(signInfo);
		};
	};
};

/// ============= Finds the cross streets to populate the first cross street drop down

var getCrossStreets = function () {
	$('#cross-street-1').html('');
	var onStreet = encodeURI($('#on-street').val().toUpperCase());
	var borough = $('#borough').val();
	
	$.ajax({
		url: '/locations/search?on_street=' + onStreet + '&borough=' + borough,
		method: 'get'
	})
	.done(renderCrossStreets);
};

/// ============= Renders the first set of cross streets to the dropdown

var renderCrossStreets = function (locations) {
	for (var i = 0; i < locations.length; i ++) {
		var cross1 = locations[i].cross_street_one;
		var dropDownItem = $('<option>').attr('value', cross1).html(cross1);
		$('#cross-street-1').append(dropDownItem);
		//var cross2 = locations[i].cross_street_two;
		//var dropDownItem2 = $('<option>').attr('value', cross2).html(cross2);
		//$('#cross-street-2').append(dropDownItem2);
	};
	$('#input-container').on('change', '#cross-street-1 option', searchCross2);
};

/// ============= Finds the cross streets to populate the second cross street drop down

var searchCross2 = function () {
	var borough = $('#borough').val();
	var onStreet = encodeURI($('#on-street').val().toUpperCase());
	var crossStreet = $('#cross-street-1').val();

	$.ajax({
		url: '/locations/search_cross?on_street=' + onStreet + '&cross_street=' + crossStreet + '&borough=' + borough,
		method: 'get'

	})
	.done(renderCross2);
};

/// ============= Renders the second set of cross streets to the dropdown

var renderCross2 = function (locations) {
	var borough = $('#borough').val();
	var onStreet = $('#on-street').val();
	var crossStreet = $('#cross-street-1').val();
	for (var i = 0; i < locations.length; i++) {
		console.log(locations[i]);
		if (locations[i].cross_street_one === crossStreet) {
			var cross2new = locations[i].cross_street_two;
			var dropDownItem = $('<option>').attr('value', cross2new).html(cross2new + ' - ' + locations[i].side_of_street + ' side of street');
			$('#cross-street-2').append(dropDownItem);
		} else if (locations[i].cross_street_two === crossStreet) {
			var cross2 = locations[i].cross_street_one;
			var dropDownItem2 = $('<option>').attr('value', cross2).html(cross2 + ' - ' +locations[i].side_of_street + ' side of street');
			$('#cross-street-2').append(dropDownItem2);
		};
	};
};
