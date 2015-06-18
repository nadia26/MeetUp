document.getElementById("searchButton").addEventListener('click', function() {
	var user = document.getElementById("search").value;
	if (user) {
		var req = $.ajax({
		  type: "POST",
		  url: "/friendrequest/"+user,
		  data: {'requestee': user}
		}).done(function(o) {
		});
	}
});
var pendingRequests = [];
var sentRequests = [];
displayRequests = function() {
	var req = $.ajax({
      url: 'http://localhost:27017/local/accounts',
      type: 'GET',
      dataType: 'jsonp',
      callback: function() {
      	console.log('luv');
      }, 
      success: function (data) {
        console.log('success', data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
    });
}