//from the list we should take:
//latitude
//longitude
//description
//start_time
//stop_time
//title
//description
//venue_name 

var EventsCollection = Backbone.Collection.extend({
  model: EventModel
});

var EventModel = Backbone.Model.extend({
  url: "/event",
  idAttribute: "_id"
});

App.EventView = Marionette.ItemView.extend({
  template: "#event-template",
  tagName: "panel panel-default",
  events: {
    "click .panel-title": function() {
      infowindow.setContent(this.model.attributes.title);
      infowindow.open(map,this.model.attributes.marker);
    }
  }
});

App.EventsCompositeView = Marionette.CompositeView.extend({
  childView: App.EventView,
  childViewContainer : "#accordion",
  template: "#events-template"
});

events = new EventsCollection();


function eventInitialize() {
   infowindow = new google.maps.InfoWindow();
   for (var i = 0; i < events.models.length; i++) {

	   	var model = events.models[i].attributes;
	   	var loc = new google.maps.LatLng(parseFloat(model.latitude), parseFloat(model.longitude));
	   	console.log(loc)
	   	var m = createMarker(loc, model.title);
	   	events.models[i].set("marker", m);
   }
}
document.getElementById("display-events").addEventListener('click', function(e) {
  if (!initialized["event"]){
    eventInitialize();
    console.log(events);
    initialized["event"] = true;
    var ecompview = new App.EventsCompositeView({collection:events});
    App.eventregion.show(ecompview);
  }
});
