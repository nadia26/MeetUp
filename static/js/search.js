//reference: https://developers.google.com/maps/documentation/geocoding/

var geocoder = new google.maps.Geocoder();

var myLL = new google.maps.LatLng(40.815, -74.0059);
var map;


function initialize() {
    var mapOptions = {
        center: myLL,
        zoom: 12
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
			      mapOptions);
}

var a = "Philadelphia, PA";
var b = "New York, NY";

function codeAddress() {
    var address = b;
    //var address = document.getElementById('address').value;

    geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	    map.setCenter(results[0].geometry.location);
	    var marker = new google.maps.Marker({
		map: map,
		position: results[0].geometry.location
	    });
	} else {
	    alert('Geocode was not successful for the following reason: ' + status);
	}
    });
}

codeAddress();

google.maps.event.addDomListener(window, 'load', initialize);
