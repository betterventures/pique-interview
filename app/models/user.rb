class User < ApplicationRecord
  before_validation :set_default_role

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  enum role: {
    provider: 0,
    recommender: 1,
    reviewer: 2,
    student: 3
  }

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
