var map;

var findNear = function(mlat,mlong){
    var loc = new google.maps.LatLng(mlat,mlong);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
	center: loc,
	zoom: 15
    });


   
    var request = {
	location: loc,
	radius: '500',
	types:['restuarant']
    };
    
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
