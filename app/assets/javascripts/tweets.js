var template = JST["tweet"],
	summaryTemplate = JST["summary"],
	otherSummaryTemplate = JST["otherSummary"],
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




function group(theArray, field){
	friendsList=[];
	for (var i = theArray.length - 1; i >= 0; i--) {	
		if (friends.hasOwnProperty(theArray[i][field[0]][field[1]])) {
			friends[theArray[i][field[0]][field[1]]]++;
		}
		else {
			friends[theArray[i][field[0]][field[1]]]=1;
		}	
	};	

	friendsArrayMake();

	$('.container').append("<div id='Locations' class='well side'>Locations</div>");

	$('#Locations').append(summaryTemplate({data: friendsList}));

	
};

function friendsArrayMake() {
	$.each(friends, function(city, count){			
		 friendsList.push({
		 	name: city, 
		 	number: count
		 });
	});
	orderThem (friendsList, 'number');
}

function otherFriendsArrayMake(theArray, field) {
	friendsList =[];
	
	if (field[3]){
		for (var i = 0; i < theArray.length; i++) {
			text  = theArray[i][field[0]],	
			count = theArray[i][field[3]][field[1]];
			friendsList.push({
				key: text, 
			 	value: count
			 });
		};
	}
	else {
		for (var i = 0; i < theArray.length; i++) {
			text  = theArray[i][field[0]],	
			count = theArray[i][field[1]];
			friendsList.push({
				key: text, 
			 	value: count
			 });
		};
	 }
	
	orderThem (friendsList, 'value');
	$('.container').append("<div id='"+field[2]+"' class='well side'>"+field[2]+"</div>");
	$('#'+field[2]).append(otherSummaryTemplate({data: friendsList}));
}

function loadPage() {
	$.ajax({
	  url: "/api/retrieveTweets/abcd",
	  type: "GET",
	  success: function(response) {
	  	window.statuses=response.statuses;

	  	
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

		group(statuses, ['user', 'location']);

		otherFriendsArrayMake(statuses, ['text', 'retweet_count', 'Retweets', null])
		otherFriendsArrayMake(statuses, ['text', 'followers_count', 'Followers', 'user'])		


	  }
	});
};

function bindScroll() {
	$(window).scroll( function() {

		if (window.innerHeight + window.scrollY > $(document).innerHeight() -100) {


		$('.side').remove(); //remove existing side divs so duplicates are not created
		loadPage();


		};
	});
}

bindScroll();
loadPage();

