class ApiController < ApplicationController
	ActiveRecord::Base.include_root_in_json = false
  def retrieveTweets
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "B3Rtidn2BG8dAqt5LDe54w"
      config.consumer_secret     = "Pn2GGbY4VrERWBUxFPFUoucK4HFv1azHHd62eCuqAU"
      config.access_token        = "28819560-rA0JdogFbLn6vHc73Xd6LpAtRatAnUfSQt7N33uL0"
      config.access_token_secret = "XckW2zwkPlIpKpNjWxQoPVdgcfccVAWiFEJG0jRgKdnST"
    end
	@tweets = client.search("#tbi")
	respond_to do |format|
		format.html
		format.json { render json: @tweets }
	 @tweets
	
	end
  end
end

  	# commmented out next four lines of original code for working on dummy data
    # file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'tweets.json')
    # tweets = File.read(file)
    # respond_to do |format|
    #   format.json { render json: tweets }
    # end

