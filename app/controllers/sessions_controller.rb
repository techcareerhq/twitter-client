class SessionsController < ApplicationController

  respond_to :html, :json

  def create
    @user = User.authenticate(params[:email], params[:password])

    if @user
      create_user_session(@user)
      respond_with @user, :location => '/', :notice => "Login succesful."
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render :json => {:error => "Invalid email or password."} }
      end
    end
  end

  def destroy
    destroy_user_session
    redirect_to '/', :notice => "Logged out."
  end

end