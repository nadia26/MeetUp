
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
      this.model.attributes.marker.setMap(map);
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

function chooseEvent(modelid) {
  var e = events.findWhere({b_id: modelid});
  console.log(e);
  events.reset(e);
  date.set({event:e.attributes});
}
eventInitialize = function() {
   infowindow = new google.maps.InfoWindow();
   for (var i = 0; i < events.models.length; i++) {
	   	var model = events.models[i].attributes;
      events.models[i].set("b_id", events.models[i].cid);
	   	var loc = new google.maps.LatLng(parseFloat(model.latitude), parseFloat(model.longitude));
	   	var m = createMarker(loc, model.title);
	   	events.models[i].set("marker", m);

   }
}
