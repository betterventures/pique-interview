class User < ApplicationRecord
  belongs_to :role
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  private

  def set_default_role
    self.role ||= Role.find_by_name('student')
  end
end
