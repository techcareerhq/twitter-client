var template = JST["tweet"]
	topTemplate = JST["headsup"]


$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {

  	var options = {
  		valueNames: [ 'name', 'retweeted', 'created', 'followers', 'influence' ]
	};

	$(".container").append("<div id='users'></div>");
	$("#users").append("<button class='sort btn' data-sort='name'>Sort by name/author</button>");
	$("#users").append("<button class='sort' data-sort='retweeted'>Sort by retweets</button>");
	$("#users").append("<button class='sort' data-sort='created'>Sort by date</button>");
	$("#users").append("<button class='sort' data-sort='followers'>Sort by followers</button>");
  	$("#users").append("<button class='sort' data-sort='influence'>Sort by influence</button>");
	$("#users").append("<ul class='list'></ul>");




    $.each(response.statuses, function(key, value){
		$(".list").append(template({status: value}));		
    });

	window.userList = new List('users', options);


  }
})
