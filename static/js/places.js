var App = new Marionette.Application();

App.addRegions({
  restregion: "#restaurant-region",
  bakeregion: "#bakery-region"
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
var restaurantChoiceButtons = [];
var markers = [];

function initialize(type) {
  var request = {
    location: a,
    radius: 500,
    types: [type]
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  //restaurantChoiceButtons = createChoiceButtons("chooseRestaurant");
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
        results[i]["type"] = "bakery";
        bakeries.unshift(new RestaurantModel(results[i]));
      }
      else {
        results[i]["type"] = "restaurant";
        restaurants.unshift(new RestaurantModel(results[i]));
      }
  		
     }
		}
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


document.getElementById("display-restaurants").addEventListener('click', function(e) {
  if (!initialized["restaurant"]){
    initialize("restaurant");
    console.log("hlo");
    initialized["restaurant"] = true;
    var rcompview = new App.RestaurantsCompositeView({collection:restaurants});
    App.restregion.show(rcompview);
  }
});

document.getElementById("display-bakeries").addEventListener('click', function(e) {
  if (!initialized["bakery"]){
    initialize("bakery");
    initialized["bakery"] = true;
    var bcompview = new App.RestaurantsCompositeView({collection:bakeries});
    App.bakeregion.show(bcompview);
  }
});

function chooseRestaurant(place_name) {
  var type = place_name.substr(0,place_name.indexOf(' '));
  place_name = place_name.substr(place_name.indexOf(' ')+1);
  if (type=="restaurant") {
    var r = restaurants.findWhere({name:place_name});
    for (var i = 0; i < restaurants.models.length; i++){
      if (restaurants.at(i) != r) {
        restaurants.at(i).attributes.marker.setMap(null);
      };
    }
    restaurants.reset(r);
    document.getElementById("bakeries-panel").style.visibility="visible"
  }
  else {
    var b = bakeries.findWhere({name:place_name});
    console.log(b);
    for (var i = 0; i < bakeries.models.length; i++){
      if (bakeries.at(i) != b) {
        bakeries.at(i).attributes.marker.setMap(null);
      }

    }
    bakeries.reset(b);
  }
}


// function createChoiceButtons(name) {
//   var l = document.getElementsByName(name);
//   console.log(l);
//   for (var j = 0; j < l.length; j++) {
//     console.log(l[j]);
//     l[j].addEventListener('click', function(e) {
//       console.log("hello");
//     });
//   };
// };

