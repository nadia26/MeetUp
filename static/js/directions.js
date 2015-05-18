console.log("directions.js");
console.log(addresses);

/*
addresses = addresses.replace(/'/g, '"'); //"
addresses = addresses.replace(/u"/g, '"');
console.log(addresses);
addresses = JSON.parse(addresses);
console.log(addresses);
 */


var address1 = addresses['address1'];
var address2 = addresses['address2'];


//HAVE TO MAKE MIDPOINT A LATLNG OBJECT


//var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var polyline = null;



function initialize() {
    //initMid();
}

function initMid() {
    //directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var myOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: chicago
    }
    
    map = new google.maps.Map(document.getElementById("midpoint-canvas"), myOptions);
    polyline = new google.maps.Polyline({
                                        path: [],
                                        strokeColor: '#FF0000',
                                        strokeWeight: 3
                                        });
    //directionsDisplay.setMap(map);
    return findMiddle(address1, address2);
}





function findMiddle(start, end) {
    var travelMode = google.maps.DirectionsTravelMode.TRANSIT
    var request = {
    origin: start,
    destination: end,
    travelMode: travelMode
    };
    directionsService.route(request, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                            polyline.setPath([]);
                            var bounds = new google.maps.LatLngBounds();
                            startLocation = new Object();
                            endLocation = new Object();
                            //directionsDisplay.setDirections(response);
                            var route = response.routes[0];
                            // For each route, display summary information.
                            var path = response.routes[0].overview_path;
                            var legs = response.routes[0].legs;
                            for (i=0;i<legs.length;i++) {
                            if (i == 0) {
                            startLocation.latlng = legs[i].start_location;
                            startLocation.address = legs[i].start_address;
                            }
                            endLocation.latlng = legs[i].end_location;
                            endLocation.address = legs[i].end_address;
                            var steps = legs[i].steps;
                            for (j=0;j<steps.length;j++) {
                            var nextSegment = steps[j].path;
                            for (k=0;k<nextSegment.length;k++) {
                            polyline.getPath().push(nextSegment[k]);
                            bounds.extend(nextSegment[k]);
                            }
                            }
                            }
                            polyline.setMap(map);
                            distance = computeTotalDistance(response);
                            distance = distance / 2;
                            midpoint = polyline.GetPointAtDistance(distance);
                            //console logging from here works
                            initMaps(midpoint);
                            } else {
                            //not entirely sure what this is for/what it does
                            alert("directions response "+status);
                            }
                            });
    return midpoint;
    
}


function computeTotalDistance(result) {
    var totalDist = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
    }
    return totalDist;
}

google.maps.Polyline.prototype.GetPointAtDistance = function(metres) {
    // some awkward special cases
    if (metres == 0) return this.getPath().getAt(0);
    if (metres < 0) return null;
    if (this.getPath().getLength() < 2) return null;
    var dist=0;
    var olddist=0;
    for (var i=1; (i < this.getPath().getLength() && dist < metres); i++) {
        olddist = dist;
        dist += google.maps.geometry.spherical.computeDistanceBetween(
                                                                      this.getPath().getAt(i),
                                                                      this.getPath().getAt(i-1)
                                                                      );
    }
    if (dist < metres) {
        return null;
    }
    var p1= this.getPath().getAt(i-2);
    var p2= this.getPath().getAt(i-1);
    var m = (metres-olddist)/(dist-olddist);
    var a = new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
    //console logging from here works
    return a
}






var directionsDisplay1 = new google.maps.DirectionsRenderer();
var directionsDisplay2 = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map1;
var map2;

function initMaps(midpoint) {
    var ny = new google.maps.LatLng(40.7903, -73.9597);
    var mapOptions = {
        zoom:7,
        center: ny,
    };
    map1 = new google.maps.Map(document.getElementById("map-canvas1"), mapOptions);
    map2 = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);
    directionsDisplay1.setMap(map1);
    directionsDisplay1.setPanel(document.getElementById('directions-panel1'));
    directionsDisplay2.setMap(map2);
    directionsDisplay2.setPanel(document.getElementById('directions-panel2'));
    calcRoute(address1, midpoint, directionsDisplay1);
    calcRoute(address2, midpoint, directionsDisplay2);
    console.log("done!");
}



function calcRoute(start, end, directionsDisplay) {
    var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                            }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
