var directionsDisplay1 = new google.maps.DirectionsRenderer();
var directionsDisplay2 = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map1;
var map2;

function initialize() {
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  };
  map1 = new google.maps.Map(document.getElementById("map-canvas1"), mapOptions);
  map2 = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);
  directionsDisplay1.setMap(map2);
  directionsDisplay1.setPanel(document.getElementById('directions-panel1'));
  directionsDisplay2.setMap(map1);
  directionsDisplay2.setPanel(document.getElementById('directions-panel2'));
}

google.maps.event.addDomListener(window, 'load', initialize);

function calcRoute(start, end, directionsDisplay) {
	//Start will be address1, end will be the intermediate point between address1 and address2
	//Maybe we can display two maps, one from users house and one from friends house? and the
	//routes they'll each take to the intermediate point. 
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

calcRoute("Montreal", "Toronto", directionsDisplay1);
calcRoute("Toronto", "Montreal", directionsDisplay2);

