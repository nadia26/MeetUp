var App = new Marionette.Application();
App.addRegions({
  collregion: "#collection-region"
});
var RestaurantCollection = Backbone.Collection.extend({
  model: RestaurantModel
});

var RestaurantModel = Backbone.Model.extend({
  url: "/restaurant",
  idAttribute: "_id"
});

App.RestaurantView = Marionette.ItemView.extend({
  template: "#restaurant-template",
  tagName: "panel panel-default"
});

App.RestaurantsCompositeView = Marionette.CompositeView.extend({
  childView: App.RestaurantView,
  childViewContainer : "#accordion",
  template: "#restaurants-template"
});

var restaurants = new RestaurantCollection();
var initialized = false;

var infowindow;

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
      console.log(results[i]);
      results[i]["open_string"] = "";
      if (results[i]["opening_hours"]["open_now"]) {
        results[i]["open_string"] = "Open Now";
      }
      else {
        results[i]["open_string"] = "Not Open"
      }
      var p = parseInt(results[i]["price_level"]);
      results[i]["price_string"] = "";
      while (p > 0) {
        results[i]["price_string"] += "$";
        p = p - 1;
      };
      restaurants.unshift(new RestaurantModel(results[i]));
  		createMarker(results[i]);
     }
		}
    console.log(restaurants);
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
  if (!initialized){
    initializePlaces();
    initialized = true;
  };
  var rcompview = new App.RestaurantsCompositeView({collection:restaurants});
  App.collregion.show(rcompview);
	document.getElementById("display").setAttribute("hidden", "hidden");
});
