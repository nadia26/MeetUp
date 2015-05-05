
var locateButtons = document.getElementsByName("locate");
var b1 = locateButtons[0];
var setCurrentLocation = function(position) {
	var longitude = document.getElementById("longitude");
	var latitude = document.getElementById("latitude");
	longitude.innerHTML = position.coords.longitude;
	latitude.innerHTML = position.coords.latitude;
	var a1 = document.getElementById("address1");
	a1.disabled = true
	a1.placeholder = "Using your current coordinates...";
}
var getCurrentLocation = function(){
	if( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition(setCurrentLocation);
	}
}

b1.addEventListener('click',getCurrentLocation);
function initialize() {
    var mapOptions = {
	center: { lat:40.7881,  lng: -73.95,},
	zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
    
}
google.maps.event.addDomListener(window, 'load', initialize);
