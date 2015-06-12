
meetups = meetups[0]
var meetupsCollection = new DatesCollection();
function parseMeetups() {
    for (var i = 0; i < meetups.length; i++){
	console.log(meetups[i]);
	meetupsCollection.unshift(new DateModel(meetups[i]));
	}
}

parseMeetups()

var mcollview = new App.DateCollectionView({collection: meetupsCollection});

App.addRegions({
    meetupsRegion: "#meetups-region"
})

App.meetupsRegion.show(mcollview);
