class ApiController < ApplicationController
  def retrieveTweets
    tweets = []
    respond_to do |format|
      format.json { render json: tweets }
    end
  end
end
