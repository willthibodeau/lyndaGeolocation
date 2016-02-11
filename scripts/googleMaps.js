// When map page is shown, run function
$('#gmap').live("pagecreate", function() {
	// Create gmap object, centering on given latitude/longitude, with a terrain map type
	$('#map_canvas').gmap({'center': '37.73787,-119.540005', 'mapTypeId': 'terrain'}).bind('init', function(evt, map) {
		// Use geolocation function watchPosition() to get position and success/fail status
		$('#map_canvas').gmap('watchPosition', function(position, status) {
			if ( status === 'OK' ) {
				// Set variable 'latling' to values from watchPosition() function arg 'position'
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				// Set up marker
				var markers = $('#map_canvas').gmap('get', 'markers' );
				if ( !markers['client'] ) {
					$('#map_canvas').gmap('addMarker', { 'id': 'client', 'position': latlng, 'bounds': true });
				} else {
					markers['client'].setPosition(latlng);
					map.panTo(latlng);
				}
			}
		});
	});
});
