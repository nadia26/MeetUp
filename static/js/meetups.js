
console.log(meetups);

var meetupsCollection = new DatesCollection();
function parseMeetups() {
	for (var i = 0; i < meetups.length; i++){
		meetupsCollection.unshift(new DateModel(meetups[i]));
	}
}

parseMeetups()

var mcompview = new App.DateCompositeView({collection: meetupsCollection});

App.addRegions({
	meetupsRegion: "#meetups-region"
})

App.meetupsRegion.show(mcompview);