console.log("hello");
var nearResults=[];
var map;
var service;
var infowindow;

function findNear(mlat, mlong){
    mlat =  -33.8665433;
    mlong= 151.1956316;
    var loc  = new google.maps.LatLng(mlat, mlong);

   // map = new google.maps.Map(document.getElementById('map'), {
//	center: loc,
//	zoom: 15
  //  });

    var request = {
	location: loc,
	radius: '500',
	query: 'resturant'
    };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status){
    if (status== google.maps.places.PlacesService.OK){
	for (var i =0; i<results.length ; i++){
	    console.log(results[i]);
	}
    }
}

document.getElementById("b").addEventListener('click', findNear(40.713,-74.0142));
