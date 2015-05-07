function initialize() {
    var mapOptions = {
	center: { lat:40.7881,  lng: -73.95,},
	zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
    
};
console.log("HELLO");

google.maps.event.addDomListener(window, 'load', initialize);
