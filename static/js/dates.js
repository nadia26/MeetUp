
var DateModel = Backbone.Model.extend({
    url: "/date",
    idAttribute: "_id",
    id:'_id',
    defaults:
    {   restaurant: {name:""},
        bakery: {name:""},
        event: {title:""}
    }
});

var DatesCollection = Backbone.Collection.extend({
    model: DateModel
});
App.DateListView = Marionette.ItemView.extend({
    template: "#date-template"
});

App.DateCollectionView = Marionette.CollectionView.extend({
    childView: App.DateListView,
    template: "#meetups-template",
    childViewContainer : "ul",

});

App.DateView = Marionette.ItemView.extend({
    template: "#date-template"
});


setUpNewDate = function() {
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
}
function saveNewDate() {
    for (key in date.attributes) {
        date.attributes[key].marker = null;
        date.attributes[key].geometry = null;
        date.attributes[key].reference = null;
        date.attributes[key].icon = null;
        date.attributes["addresses"] = addresses;
    }
    date.save(date.toJSON());
}
