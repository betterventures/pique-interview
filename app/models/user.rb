class User < ApplicationRecord
  before_validation :set_default_role

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # please note if you change the key name, to keep the int the same
  # (for backwards compatibility)
  enum role: {
    provider: 0,  # providers (admin) and reviewers
    educator: 1,  # counselors (admin) and recommenders
    student: 2    # applicants
  }

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
