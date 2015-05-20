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
  tagName: "panel panel-default",
  events: {
    "click .panel-title": function() {
      console.log(this);
      infowindow.setContent(this.model.attributes.name);
      infowindow.open(map,this.model.attributes.marker);
    }
  }
});
App.RestaurantsCompositeView = Marionette.CompositeView.extend({
  childView: App.RestaurantView,
  childViewContainer : "#accordion",
  template: "#restaurants-template"
});

var restaurants = new RestaurantCollection();
var bakeries = new RestaurantCollection();
var initialized = {
  "restaurant" : false,
  "bakery" : false
}
var infowindow;

function initialize(type) {
  var request = {
    location: a,
    radius: 500,
    types: [type]
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      results[i]["open_string"] = "";
      if ( results[i]["opening_hours"] && results[i]["opening_hours"]["open_now"]) {
        results[i]["open_string"] = "Open Now";
      }
      else {
        results[i]["open_string"] = "Not Open"
      }
      if (!results[i]["rating"]) {
        results[i]["rating"] = 0;
      }
      var p = parseInt(results[i]["price_level"]);
      results[i]["price_string"] = "";
      while (p > 0) {
        results[i]["price_string"] += "$";
        p = p - 1;
      };
      results[i]["marker"] = createMarker(results[i]);
      if (results[0]["types"].indexOf("bakery") > -1) {
        bakeries.unshift(new RestaurantModel(results[i]));
      }
      else {
        restaurants.unshift(new RestaurantModel(results[i]));
      }
  		
     }
		}
    console.log(restaurants);
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);

  });
  return marker;
}


document.getElementById("displayRestaurants").addEventListener('click', function(e) {
  if (!initialized["restaurant"]){
    initialize("restaurant");
    initialized["restaurant"] = true;
  };
  var rcompview = new App.RestaurantsCompositeView({collection:restaurants});
  App.collregion.show(rcompview);
	//document.getElementById("display").setAttribute("hidden", "hidden");
});

document.getElementById("displayBakeries").addEventListener('click', function(e) {
  if (!initialized["bakery"]){
    initialize("bakery");
    initialized["bakery"] = true;
  };
  var bcompview = new App.RestaurantsCompositeView({collection:bakeries});
  App.collregion.show(bcompview);
  //document.getElementById("display").setAttribute("hidden", "hidden");
});
