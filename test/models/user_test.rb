require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @student = users(:bob_student)
    @provider = users(:nasa_provider)
  end

  test "has role" do
    assert_equal roles(:student), @student.role
  end

  test "can't have no role" do
    @student.role_id = nil
    assert_equal false, @student.valid?
  end
end
