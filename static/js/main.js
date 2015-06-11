
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
    

    autocomplete = new google.maps.places.Autocomplete((document.getElementById('input1')),
                                                       { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                                  fillInAddress();
                                  });
    
    
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place);
    /*
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
     */
}


google.maps.event.addDomListener(window, 'load', initialize);
    
