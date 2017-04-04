require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "get index" do
    get :index
    assert_response :ok
  end
end
