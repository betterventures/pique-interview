require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "get index" do
    get "/"
    assert_response :ok
  end
end
