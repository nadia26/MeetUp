
meetups = meetups[0]

var meetupsCollection = new DatesCollection(meetups);


var mcollview = new App.DateCollectionView({collection: meetupsCollection});

App.addRegions({
    meetupsRegion: "#meetups-region"
})

App.meetupsRegion.show(mcollview);
