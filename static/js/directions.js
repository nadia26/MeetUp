console.log("currently in directions.js");


var address1 = "Montreal";
var address2 = "Toronto";

var directionsDisplay1 = new google.maps.DirectionsRenderer();
var directionsDisplay2 = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map1;
var map2;

function initMaps() {
    var ny = new google.maps.LatLng(40.7903, -73.9597);
    var mapOptions = {
        zoom:7,
        center: ny,
    };
    map1 = new google.maps.Map(document.getElementById("map-canvas1"), mapOptions);
    map2 = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);
    directionsDisplay1.setMap(map2);
    directionsDisplay1.setPanel(document.getElementById('directions-panel1'));
    directionsDisplay2.setMap(map1);
    directionsDisplay2.setPanel(document.getElementById('directions-panel2'));
    calcRoute(address1, address2, directionsDisplay1);
    calcRoute(address2, address1, directionsDisplay2);
}



function calcRoute(start, end, directionsDisplay) {
    var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                console.log(result);
                                directionsDisplay.setDirections(result);
                            }
    });
}


google.maps.event.addDomListener(window, 'load', initMaps);


