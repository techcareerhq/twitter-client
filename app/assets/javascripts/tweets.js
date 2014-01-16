$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {
    $.each(response.statuses, function(key, value){
    	$(".container")
    	.append("<b>"+value.text+"</b><br>")
    	.append("Created on: "+value.created_at+"<br>")
    	.append("<a href ='https://twitter.com/"+value.user.screen_name+"/statuses/"+value.id_str+"'>Link to tweet</a><br>")
		.append(value.user.name+"<br>")
		.append("Followers: "+value.user.followers_count+"<br>")
		.append("Retweeted: "+value.retweet_count+"<br>")
		.append("<a href='http://twitter.com/"+value.user.screen_name+"'>"+value.user.screen_name+"</a><br>");
		// $.each(user.entities.hashtags, function(key, value){
		// 	.append("#"+value.text+"    ");
		// });
		if (value.in_reply_to_status_id){
			$(".container").append("<span class='response'>In response to: <a href ='https://twitter.com/"
    			+value.in_reply_to_user_id_str+"/statuses/"+value.in_reply_to_status_id_str="'>"
    			+value.in_reply_to_user_id_str+"</a></span>");

		}
		// if (response.statuses.entities.media){
		// 	$(".container").append("<img src='"+value.value.entities.media.media_url+"'/>");

		// }
		$(".container").append("<br><br>")
		
    });
  }
})
