class UsersController < ApplicationController

  respond_to :html, :json

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      flash[:notice] = 'Account created.'
    end
    respond_with @user, :location => '/'
  end

end