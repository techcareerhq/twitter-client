class ApiController < ApplicationController
  def retrieveTweets

    API_KEYS = YAML::load_file("#{Rails.root}/config/api_keys.yml")[Rails.env]

    client = Twitter::REST::Client.new do |config|
      config.consumer_key    = API_KEYS['twitter']['api_key']
      config.consumer_secret = API_KEYS['twitter']['api_secret']
    end

    # respond_to do |format|
    #   format.json { render json: tweets }
    # end
  end
end
