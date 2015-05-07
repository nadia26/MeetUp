
var locateButtons = document.getElementsByName("locate");
var a1 = locateButtons[0];
var a2 = locateButtons[1];

function getCurrentLocation() {
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    a1.innerHTML = position;
	});
    }
}
a1.addEventListener('click',getCurrentLocation());

function initialize() {
    var mapOptions = {
	center: { lat:40.7881,  lng: -73.95,},
	zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
    
}
google.maps.event.addDomListener(window, 'load', initialize);
