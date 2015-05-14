var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var polyline = null;
var infowindow = new google.maps.InfoWindow();

var midpoint;

function createMarker(latlng, label, html) {
    var contentString = '<b>'+label+'</b><br>'+html;
    var marker = new google.maps.Marker({
                                        position: latlng,
                                        map: map,
                                        title: label,
                                        zIndex: Math.round(latlng.lat()*-100000)<<5
                                        });
    marker.myname = label;
    
    google.maps.event.addListener(marker, 'click', function() {
                                  infowindow.setContent(contentString+"<br>"+marker.getPosition().toUrlValue(6));
                                  infowindow.open(map,marker);
                                  });
    return marker;
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
    midpoint = new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
    return midpoint;
}

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var myOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: chicago
    }
    
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    polyline = new google.maps.Polyline({
                                        path: [],
                                        strokeColor: '#FF0000',
                                        strokeWeight: 3
                                        });
    directionsDisplay.setMap(map);
    var start = "108 E 2nd St Brooklyn NY 11218";
    var end = "345 Chambers St Manhattan NY 10282";
    calcRoute(start, end);
    console.log("done!");
}

function calcRoute(start, end) {
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
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                // For each route, display summary information.
                var path = response.routes[0].overview_path;
                var legs = response.routes[0].legs;
                for (i=0;i<legs.length;i++) {
                    if (i == 0) {
                        startLocation.latlng = legs[i].start_location;
                        startLocation.address = legs[i].start_address;
                        marker = createMarker(legs[i].start_location,"midpoint","","green");
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
                computeTotalDistance(response);
                } else {
                    //not entirely sure what this is for/what it doesd
                    alert("directions response "+status);
                    }
                });
                  
}

var totalDist = 0;
var totalTime = 0;

function computeTotalDistance(result) {
    totalDist = 0;
    totalTime = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
        totalTime += myroute.legs[i].duration.value;
    }
    findPoint(50);
    
}

function findPoint(percentage) {
    var distance = (percentage/100) * totalDist;
    polyline.GetPointAtDistance(distance);
}


google.maps.event.addDomListener(window, 'load', initialize);
