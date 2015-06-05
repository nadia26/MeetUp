console.log("autotest.js");


function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(-33.8688, 151.2195),
    zoom: 13
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
				mapOptions);


    

  var input1 = /** @type {HTMLInputElement} */(
      document.getElementById('input1'));

  var autocomplete = new google.maps.places.Autocomplete(input1);
  autocomplete.bindTo('bounds', map);


  google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
	  window.alert("Autocomplete's returned place contains no geometry");
	  return;
      }
      //if (place.geometry.viewport) {
      else {
	  place = place['formatted_address'];
	  console.log(place);
	  input1.value = place;
	  console.log(input1);
      }
  })}

  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

google.maps.event.addDomListener(window, 'load', initialize);
