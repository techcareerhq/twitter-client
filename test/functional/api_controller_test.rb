require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  test "should get retrieveTweets" do
    get :retrieveTweets
    assert_response :success
  end

end
