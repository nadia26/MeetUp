
DateModel = Backbone.Model.extend({
    url: "/date",
    idAttribute: "_id",
    id:'_id',
    defaults:
    {   restaurant: {name:""},
    	bakery: {name:""},
    	event: {title:""},
        addresses: addresses
    }
});

App.DateView = Marionette.ItemView.extend({
   template: "#date-template"
});

date = new DateModel();
console.log(date);
var dateview = new App.DateView({model:date});
App.dateregion.show(dateview);

dateview.listenTo(date, 'change', function() {
	dateview.render();
	var button = document.getElementById("createDate")
    if(button){
        button.disabled=false;
    };
});

function saveNewDate() {
    for (key in date.attributes) {
        date.attributes[key].marker = null;
        date.attributes[key].geometry = null;
        date.attributes[key].reference = null;
        date.attributes[key].icon = null;
    }
    console.log(date.toJSON());
    date.save(date.toJSON());
}