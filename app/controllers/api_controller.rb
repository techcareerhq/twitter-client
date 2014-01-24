class ApiController < ApplicationController

require 'twitter'

  def retrieveTweets
    page = params[:page].to_i

    client = Twitter::REST::Client.new do |config|
      config.consumer_key    = CONSUMER_KEY
      config.consumer_secret = CONSUMER_SECRET
      config.access_token        = OAUTH_KEY
      config.access_token_secret = OAUTH_SECRET
    end


    tweets = client.search('stanford', options = { :count => 5 , :since_id => page})
    
    respond_to do |format|
      format.json { render json: tweets }
    end
  end
end
