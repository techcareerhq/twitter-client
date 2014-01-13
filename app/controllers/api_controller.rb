class ApiController < ApplicationController
  def retrieveTweets
    tweets = []
    return json: tweets
  end
end
