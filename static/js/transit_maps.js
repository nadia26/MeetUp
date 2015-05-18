var midpoint;
var address1 = "Montreal";
var address2 = "Toronto";


function initialize() {
    initMid();
    //initMaps();
    console.log(midpoint);
}

//var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var polyline = null;


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
    findMiddle(address1, address2);
    console.log("done!");
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
        return polyline.GetPointAtDistance(distance);
        } else {
            //not entirely sure what this is for/what it does
            alert("directions response "+status);
            }
        });
    
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
    midpoint = new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
    return midpoint;
}



google.maps.event.addDomListener(window, 'load', initialize);
