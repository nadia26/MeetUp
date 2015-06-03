var DatesCollection = Backbone.Collection.extend({
    model: Date
});

var Date = Backbone.Model.extend({
    url: "/date",
    idAttribute: "_id"
});

App.DateView = Marionette.ItemView.extend({
    
});

