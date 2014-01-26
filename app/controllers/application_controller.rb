class ApplicationController < ActionController::Base
  protect_from_forgery
require 'twitter'


  def get_tweets 
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ""
      config.consumer_secret     = ""
      config.access_token        = ""
      config.access_token_secret = ""
    end

  
  end
end
