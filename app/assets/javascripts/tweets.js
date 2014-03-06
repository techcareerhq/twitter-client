var template = JST["tweet"],
	summaryTemplate = JST["summary"],
	otherSummaryTemplate = JST["otherSummary"],
	localTemplate = JST["location"];
	

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
		this.$el.append('<div id="sideBar"><div id="retweets"></div><div id="followers"></div><div id="locations"></div></div>');
 	
		//do for loop then do each after for works, iterate through models of collection
		// for (var i = 0; i < this.collection.length; i++) {
			
		// 	$('.list').append(template({status: this.collection.at(i).toJSON()}));
		// };



		//jquery each
		// $(this.collection.models).each( function(index, twitterStuff) {
		// 	debugger
			

		//underscore each
		// 	$('.list').append(template({status: twitterStuff.toJSON()}));
		// });

		// list tweet summaries
		_.each(this.collection.models, function(twitterStuff, index, list){
				$('.list').append(template({status: twitterStuff.toJSON()}));
		});


		//sidebar for retweets
		this.collection.comparator = "retweet_count";
		this.collection.sort();
		$('#retweets').html('<ul class="well rt">Retweets</ul>');
		for (var i = this.collection.length; i > this.collection.length-3; i--) {
			$('.rt').append(otherSummaryTemplate({status: this.collection.at(i-1).toJSON()}));
		};

		//sidebar for followers
		this.collection.comparator= function(ab) {               
	    	return ab.get('user')['followers_count'];
	    };
	    this.collection.sort();
		$('#followers').html('<ul class="well fl">Followers</ul>');
		var followerObject={};

		for (var i = this.collection.length-1; i>=0 && _.size(followerObject)<3; i--) {
			name = this.collection.at(i).get('user')['screen_name'];
			if ( !followerObject.hasOwnProperty(name)){
				followerObject[name]=this.collection.at(i).get('user');
			}
		};

		_.each(followerObject, function(userStatus){	
				$('.fl').append(summaryTemplate(userStatus));
		});

		//sidebar for location
		$('#locations').html('<ul class="well lc">Locations</ul>');
		locationList={},
		locationForTemplate=[];
		_.each(this.collection.models, function(twitterStuff, index,list){
			
			var locale=twitterStuff.get('user')['location'];
			
				if ( !locationList.hasOwnProperty(locale)){
					locationList[locale]=1;
				}
				else{
					locationList[locale]+=1
				}
		});
		function locationPreperation (){
			$.each(locationList, function(area, count){
				locationForTemplate.push({
					geo: area,
					count: count
				});

			});
		}
		locationPreperation()

		for (var i = _.size(locationForTemplate)-1; i >=_.size(locationForTemplate)-3; i--) {
			$('.lc').append(localTemplate({data: locationForTemplate[i]}));
		};

	},



	el: '.container'

});


var Tweet = Backbone.Model.extend({

});

var Tweets = Backbone.Collection.extend({
	url: '/api/retrieveTweets/abcd',
	model: Tweet
	
});


var TweetOrder = Tweets
TweetOrder.comparator = 'retweet_count';



// button that points to /logout
