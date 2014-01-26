class ApiController < ApplicationController

require 'twitter'

  def retrieveTweets
    if params[:page] == '1'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford1.json')
    elsif params[:page] == '2'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford2.json')
    elsif params[:page] == '3'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford3.json')
    elsif params[:page] == '4'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford4.json')
    elsif params[:page] == '5'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford5.json')
    elsif params[:page] == '6'
      file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford6.json')
    end

    tweets = File.read(file)


    respond_to do |format|
      format.json { render json: tweets }
    end
  end

  def postTweet
    if (params.has_key?(:message) && params.has_key?(:username))
    message = "Your response has been successfully posted."
    respond_to do |format|
      format.json { render json: message }
    end

  else
    message = 'There was an error with your response.'
    respond_to do |format|
      format.json { render json:  { :errors => message }, , :status => 422}
    end

end
