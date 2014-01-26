var template = JST["tweet"]
$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {

  	var options = {
  valueNames: [ 'name', 'retweeted', 'created', 'followers', 'influence' ]
};
var userList = new List('users', options);
	
		$(".container").append("<input class='search' placeholder='Search' />");
  	$(".container").append("<div id='users'>");
  	$(".container").append("<button class='sort' data-sort='name'>Sort by name/author</button>");
  	$(".container").append("<button class='sort' data-sort='retweeted'>Sort by retweets</button>");
  	$(".container").append("<button class='sort' data-sort='created'>Sort by date</button>");
  	$(".container").append("<button class='sort' data-sort='followers'>Sort by followers</button>");
  	$(".container").append("<button class='sort' data-sort='influence'>Sort by influence</button></div>");
    $.each(response.statuses, function(key, value){
		$(".container").append(template({status: value}));		
    });
  }
})
