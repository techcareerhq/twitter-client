class StaticPagesController < ApplicationController
	before_filter :require_user

  def home
  end

  def help
  end
end
