var template = JST["tweet"],
	summaryTemplate = JST["summary"],
	otherSummaryTemplate = JST["otherSummary"],
	friends={},
	friendsList =[],
	options = {
  		valueNames: [ 'name', 'retweeted', 'created', 'followers', 'influence' ]
	};

function group(theArray, field){ //groups location info 
	friendsList=[];
	debugger
	for (var i = theArray.length - 1; i >= 0; i--) {	
		if (friends.hasOwnProperty(theArray[i][field[0]][field[1]])) {
			friends[theArray[i][field[0]][field[1]]]++;
		}
		else {
			friends[theArray[i][field[0]][field[1]]]=1;
		}	
	};	

	friendsArrayMake();
	return friendsList;
	// $('#sideBar').append("<div id='Locations' class='well side'></div>");
	// $('#Locations').append(summaryTemplate({data: friendsList}));
};

function friendsArrayMake() { //makes array to output to template
	$.each(friends, function(city, count){			
		 friendsList.push({
		 	name: city, 
		 	number: count
		 });
	});
	orderThem (friendsList, 'number');
}

var orderThem = function (theArray, field){ //orders by number value
	theArray.sort(function (a, b) {
	    if (a[field] > b[field])
	      return -1;
	    if (a[field] < b[field])
	      return 1;
	    // a must be equal to b
	    return 0;
	});		
};

function otherFriendsArrayMake(theArray, field) { //used for non-location fields
	friendsList =[];
	
	if (field[3]){ //field[3] will almost always be "user", if it is used
		for (var i = 0; i < theArray.length; i++) {
			text  = theArray[i][field[0]],	
			count = theArray[i][field[3]][field[1]];
			friendsList.push({
				key: text, 
			 	value: count
			 });
		};
	}
	else { //for fields that don't need "user"
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
	$('#sideBar').append("<div id='"+field[2]+"' class='well side'>"+field[2]+"</div>");
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
		$("#users").append("<ul class='list'></ul>");

		orderThem(response.statuses, 'retweet_count');

		//output tweet info
	    $.each(response.statuses, function(key, value){
			$(".list").append(template({status: value}));		
	    });

	    //listjs stuff
		window.userList = new List('users', options);

	  }
	});
	startPage();
};

function bindScroll() {
	$(window).scroll( function() {

		if (window.innerHeight + window.scrollY > $(document).innerHeight() -100) {


		$('.side').remove(); //remove existing side divs so duplicates are not created
		loadPage();


		};
	});
}



function startPage(){
	window.myTweets = new Tweets();
	window.myTweets.fetch();
	new TwitterView({collection: window.myTweets});
}

$(document).ready(loadPage);



var TwitterView = Backbone.View.extend({

	initialize: function() {
		this.collection.on('reset', this.render, this)
	},

	render: function() {
	debugger
	},

	el: '#sideBar',

	clicked: function(){
		
	},

	events: {
		'click': 'clicked'
	}
});

var Tweet = Backbone.Model.extend({

});

var Tweets = Backbone.Collection.extend({
	url: "/api/retrieveTweets/abcd",
	model: Tweet,
	parse: function(response) {
    	return response.statuses;
 	}
});



