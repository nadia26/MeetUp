



var getEvents= $.ajax({
	url: "http://api.eventful.com/json/events/search?&app_key=cWNxSHrggxxJH23h&where=32.746682,-117.162741&within=1&date=Today",
	dataType: 'jsonp',
	success: function(results){
		console.log(results);
	}
});

$("#loadRes").click(getEvents);	