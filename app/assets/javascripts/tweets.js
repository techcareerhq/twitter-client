debugger;
$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  data: {
    page: 4
  },
  success: function(response) {
    debugger;
  }
})