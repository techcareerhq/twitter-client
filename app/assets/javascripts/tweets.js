var template = JST["tweet"],
	friends={}
	friendsList =[];

var orderThem = function (theArray, field){
	theArray.sort(function (a, b) {
	    if (a[field] > b[field])
	      return -1;
	    if (a[field] < b[field])
	      return 1;
	    // a must be equal to b
	    return 0;
	});		
};

var group = function (theArray){
	for (var i = theArray.length - 1; i >= 0; i--) {	
		if (friends.hasOwnProperty(theArray[i].user.location)) {
			friends[theArray[i].user.location]++;
		}
		else {
			friends[theArray[i].user.location]=1;
		}	
	};	
	for (var i = 0; i < friends.length; i++) {	
		friendsList[i].push(friends.city);
		friendsList[i].push(friends.count);
	};
};

$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {
  	window.statuses=response.statuses;

  	
	
	$('.container').append("<div id='sideInfo'></div>");
	$(".container").append("<div id='users' class='btn-group'></div>");
	$('.sideinfo').text(group(statuses, 'user.location'));
	$("#users").append("<button class='sort btn btn-default' data-sort='name'>Sort by name/author</button>");
	$("#users").append("<button class='sort btn btn-default' data-sort='retweeted'>Sort by retweets</button>");
	$("#users").append("<button class='sort btn btn-default' data-sort='created'>Sort by date</button>");
	$("#users").append("<button class='sort btn btn-default' data-sort='followers'>Sort by followers</button>");
  	$("#users").append("<button class='sort btn btn-default' data-sort='influence'>Sort by influence</button>");
	$("#users").append("<br><br><ul class='list'></ul>");


	orderThem(response.statuses, 'retweet_count');


	//outout tweet info
    $.each(response.statuses, function(key, value){
		$(".list").append(template({status: value}));		
    });

    //listjs stuff
	var options = {
  		valueNames: [ 'name', 'retweeted', 'created', 'followers', 'influence' ]
	};
	window.userList = new List('users', options);



  }
})


