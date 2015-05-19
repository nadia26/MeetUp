console.log("places.js");
var infowindow;
var namesList = [];

function initializePlaces() {
	var request = {
		location: a,
		radius: 500,
		types: ["restaurant"]
	};
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      
		namesList.push(results[i]["name"]);
		createMarker(results[i]);
   }
    for (var i = 0; i <results.length; i++) {
      console.log(namesList[i]);
    }
		}
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
document.getElementById("display").addEventListener('click', function(e) {
	initializePlaces();
	document.getElementById("display").setAttribute("disabled", "disabled");
});
