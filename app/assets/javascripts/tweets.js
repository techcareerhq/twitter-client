var template = JST["tweet"],
	summaryTemplate = JST["summary"],
	friends={},
	friendsList =[],
	options = {
  		valueNames: [ 'name', 'retweeted', 'created', 'followers', 'influence' ]
	};

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

function group(theArray){
	for (var i = theArray.length - 1; i >= 0; i--) {	
		if (friends.hasOwnProperty(theArray[i].user.location)) {
			friends[theArray[i].user.location]++;
		}
		else {
			friends[theArray[i].user.location]=1;
		}	
	};	

	friendsArrayMake();
	return friendsList;
};

function friendsArrayMake() {
	$.each(friends, function(city, count){			
		 friendsList.push({name: city, number: count});
	});
	orderThem (friendsList, 'number');
}


$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {
  	window.statuses=response.statuses;

  	
	$('.container').append("<div id='sideInfo'></div>");
	group(statuses);
	
	for (var i = 0; i < 3; i++) {
		$('#sideInfo').append('<li>' +friendsList[i].name+ ' : ' +friendsList[i].number+'<li>');
	};

	

	$(".container").append("<div id='users' class='btn-group'></div>");
	$.each(options.valueNames, function(key, something){
		$("#users").append("<button class='sort btn btn-default' data-sort='"+something+"'>Sort by "+something+"</button>");
	});
	$("#users").append("<br><br><ul class='list'></ul>");

	orderThem(response.statuses, 'retweet_count');

	//output tweet info
    $.each(response.statuses, function(key, value){
		$(".list").append(template({status: value}));		
    });

    //listjs stuff
	window.userList = new List('users', options);

	


  }
});



