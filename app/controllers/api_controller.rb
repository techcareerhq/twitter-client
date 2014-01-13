class ApiController < ApplicationController
  def retrieveTweets
    file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'tweets.json')
    tweets = File.read(file)
    respond_to do |format|
      format.json { render json: tweets }
    end
  end
end
