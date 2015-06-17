
function initialize() {
    var mapOptions = {
        center: { lat: 40.815, lng: -74.0059},
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("myModal").style.visibility = "visible";
document.getElementById("myModal").style.display = "inline";

