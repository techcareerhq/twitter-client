var template = JST["tweet"],
	summaryTemplate = JST["summary"],
	otherSummaryTemplate = JST["otherSummary"];
	

function startPage(){
	window.myTweets = new Tweets();
	window.myTweets.fetch();
	new TwitterView({collection: window.myTweets});
}

var TwitterView = Backbone.View.extend({

	initialize: function() {
		
		this.collection.on('reset', this.render, this)
	},

	render: function() {
		this.$el.html('');
		this.$el.append('<div class="list"><div>');
		this.$el.append('<div id="sideBar"><div id="retweets"></div><div id="followers"></div></div>');
	
		//do for loop then do each after for works, iterate through models of collection
		$(this.collection).each( function() {
			
			$('.list').append(template({status: this.collection.toJSON()}));
		});
		this.collection.comparator = "retweet_count";
		this.collection.sort();
		$('#retweets').html('<ul class="well rt">Retweets</ul>');
		for (var i = (this.collection.length)-3; i < this.collection.length; i++) {
			$('.rt').append(otherSummaryTemplate({status: this.collection.at(i).toJSON()}));
		};
		this.collection.comparator = "user.followers_count";
		this.collection.sort();
		$('#followers').html('<ul class="well fl">Followers</ul>');
		for (var i = (this.collection.length)-3; i < this.collection.length; i++) {
			$('.fl').append(summaryTemplate({status: this.collection.at(i).toJSON()}));
		};

	},

	el: '.container',

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


$(document).ready(startPage);
