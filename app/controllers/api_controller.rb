class ApiController < ApplicationController

require 'twitter'

  def retrieveTweets
    file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford1.json')
    if Integer(params[:page]) <= 6
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford' + params[:page] + '.json')
    end

    tweets = JSON.parse(File.read(file))
    render :json => tweets, :status => 200
  end

  def postTweet
    if params.has_key?(:message) && params.has_key?(:username)
      message = { :message => "Your response has been successfully posted."}
      render :json => message
    else
      message = 'There was an error with your response.'
      render :json => {:error => message}.to_json, :status => 500
    end
  end

end
