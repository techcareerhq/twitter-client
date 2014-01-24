class ApplicationController < ActionController::Base
  protect_from_forgery
require 'twitter'


  def get_tweets 
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "8vhQySns4XpMA6sF4919iA"
      config.consumer_secret     = "WZoPItMNJHntyESwJjD7bFBkGLxrZrSBGfQNcLlHE"
      config.access_token        = "DC0sePOBbQ8bYdC8r4Smg"
      config.access_token_secret = "24539460-SmUZALi3kldP8oVp4yu1N4mE8kftudArudhJO8JZ9"
    end

     binding.pry
  
  end
end
