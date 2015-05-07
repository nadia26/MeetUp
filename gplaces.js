var mspot= [{lat: 40.7183, longi:-74.0142}];

function findNear(mspot){
    var loc = new google.maps.LatLng(mspot[0],mspot[1]);

    var request ={
	location: loc,
	radius: '500'
	types:['restuarant']
    };
    


}
element= document.getElementById("b");
element.addEventListener('click', findNear(mspot));
