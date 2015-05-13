addresses = addresses.replace(/'/g, '"'); //"
addresses = addresses.replace(/u"/g, '"');
addresses = JSON.parse(addresses);
console.log(addresses);

var map;
var geocoder;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: { lat: 40.815, lng: -74.0059},
        zoom: 12
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);
}

function codeAddress() {
    var address = addresses['address1'];
    geocoder.geocode( { 'address': addresss }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
codeAddress();
