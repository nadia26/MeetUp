var fillHomeAddress = function(address) {
    document.getElementById("input1").value = address;
}
var locateButtons = document.getElementsByName("locate");
var b1 = locateButtons[0];

var setCurrentLocation = function(position) {
    var longitude = document.getElementById("longitude");
    var latitude = document.getElementById("latitude");
    longitude.innerHTML = position.coords.longitude;
    latitude.innerHTML = position.coords.latitude;
    var a1 = document.getElementById("address1");
    a1.disabled = true
    a1.placeholder = "Using your current coordinates...";
}
var getCurrentLocation = function(){
    if( navigator.geolocation ) {
	navigator.geolocation.getCurrentPosition(setCurrentLocation);
    }
}

//b1.addEventListener('click',getCurrentLocation);


function initialize() {
    var mapOptions = {
	center: { lat:40.7881,  lng: -73.95,},
	zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
    autocomplete1 = new google.maps.places.Autocomplete((document.getElementById('input1')),
							{ types: ['geocode'] });
    autocomplete2 = new google.maps.places.Autocomplete((document.getElementById('input2')),
                                                        { types: ['geocode'] });
    
    autocomplete1.bindTo('bounds', map);
    autocomplete2.bindTo('bounds', map);


}



var input1= document.getElementById('input1');
google.maps.event.addDomListener(input1, 'keydown', function(e) {
    if (e.keyCode == 13 && $('.pac-container:visible').length) {
        e.preventDefault();
    }
});

//(might want to get rid of this)
//this stops enter from submitting the form on the second input
var input2= document.getElementById('input2');
google.maps.event.addDomListener(input2, 'keydown', function(e) {
    if (e.keyCode == 13 && $('.pac-container:visible').length) {
        e.preventDefault();
    }
});






google.maps.event.addDomListener(window, 'load', initialize);

