
var midPoint= "40.7178801,-74.0137509";
var eventsArray=[];

var getEvents= $.ajax({
	url: "http://api.eventful.com/json/events/search?&app_key=cWNxSHrggxxJH23h&where="+midPoint+"&within=1&date=Today",
	dataType: 'jsonp',
	success: function(results){
		for (i=0; i < results["events"]["event"].length; i++){
			eventsArray.push(results["events"]["event"][""+i+""]);
		}
		console.log(eventsArray[0]);
		console.log(eventsArray);
	}
});

$("loadRes").click(getEvents);	