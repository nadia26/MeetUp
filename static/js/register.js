
var autocomplete;
var input = document.getElementById("address");
function initialize() {
  autocomplete = new google.maps.places.Autocomplete(
      (input),
      { types: ['geocode'] });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    input.value = autocomplete.getPlace().formatted_address;
    console.log(autocomplete.getPlace());
  });
}


function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

initialize();
geolocate();
