class ApplicationController < ActionController::Base
  protect_from_forgery



  

  helper_method :current_user

  private

  def require_user
    return if current_user

    respond_to do |format|
      format.html { redirect_to login_path }
      format.all  { render :text => 'unauthorized', :status => :unauthorized }
    end
  end

  def current_user
    return @current_user if @current_user

    if session[:user_id]
      @current_user = User.find(session[:user_id])
    elsif (header = request.headers['Authorization'].to_s.sub('Basic ','')) != ''
      header = Base64.decode64(header).split(':')
      username = header.shift
      password = header.join(':')
      @current_user = User.authenticate(username, password)
    end
  end

  def create_user_session(user)
    session[:user_id] = user.id
  end

  def destroy_user_session
    session[:user_id] = nil
  end

end