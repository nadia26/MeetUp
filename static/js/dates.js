var DatesCollection = Backbone.Collection.extend({
    model: Date
});

var DateModel = Backbone.Model.extend({
    url: "/date",
    idAttribute: "_id",
    defaults:
    {
    	restaurant: {name:""},
    	bakery: {name:""},
    	event: {title:""},
    }
});

App.DateView = Marionette.ItemView.extend({
   template: "#date-template"
});

date = new DateModel();
var dateview = new App.DateView({model:date});
App.dateregion.show(dateview);
dateview.listenTo(date, 'change', function() {
	console.log(this);
	dateview.render();
	document.getElementById("createDate").disabled=false;
});