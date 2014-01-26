$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  data: {
    page: 1
  },
  success: function(response) {
    debugger;
  }
})

function postTweet() {
  $.ajax({
    type: "post",
    url:"/api/posttweet",
    data: {
      username: "first last",
      message: "hello"
    },
    success: function(){
      debugger;
    }
  })
}