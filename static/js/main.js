
var locateButtons = document.getElementsByName("locate");
var a1 = locateButtons[0];
a1.addEventListener('click',function(e) {console.log('click')});
function initialize() {
    var mapOptions = {
	center: { lat:40.7881,  lng: -73.95,},
	zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
    
}
google.maps.event.addDomListener(window, 'load', initialize);
