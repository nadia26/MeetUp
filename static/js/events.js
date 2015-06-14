
EventsCollection = Backbone.Collection.extend({
  model: EventModel
});

var EventModel = Backbone.Model.extend({
  url: "/event",
  idAttribute: "_id"
});

App.EventView = Marionette.ItemView.extend({
  template: "#event-template",
  tagName: "panel panel-default",
  // initialize: function () {
  //     console.log('hell');
  //     this.model.on('change', this.render, this);
  // },
  events: {
    "click .panel-title": function() {
      this.model.attributes.marker.setMap(map);
      infowindow.setContent(this.model.attributes.title);
      infowindow.open(map,this.model.attributes.marker);
    }
  }
});

// dateview.listenTo(date, 'change', function() {
//       dateview.render();
//       var button = document.getElementById("createDate")
//         if(button){
//             button.disabled=false;
//         };
//     });

App.EventsCompositeView = Marionette.CompositeView.extend({
  childView: App.EventView,
  childViewContainer : "#accordion",
  template: "#events-template"
});



function chooseEvent(modelid) {
  var e = events.findWhere({b_id: modelid});
  events.reset(e);
  date.set({event:e.attributes});
}

loadEventAPI = function() {
  var getEvents= $.ajax({
    url: "http://api.eventful.com/json/events/search?&app_key=cWNxSHrggxxJH23h&where="+a.lat()+","+a.lng()+"&within=1&date=Today",
    dataType: 'jsonp',
    success: function(results){
            for (i=0; i < results["events"]["event"].length; i++){
                eventsArray.push(results["events"]["event"][""+i+""]);
            }
            eventInitialize(eventsArray);
        }
    });
  }


eventInitialize = function(array) {
  events = new EventsCollection();
  if (array){
    for (var i = 0; i < array.length; i++) {
    var model = new EventModel(array[i]);
    model.set("b_id", model.cid)
    var loc = new google.maps.LatLng(parseFloat(model.latitude), parseFloat(model.longitude));
    var m = createMarker(loc, model.title);
    model.set("marker",m);
    events.unshift(model);
    ecompview = new App.EventsCompositeView({collection:events});
    App.eventregion.show(ecompview);
    }
  };
  
  
}


  
