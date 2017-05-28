class User < ApplicationRecord
  before_validation :set_default_role
  before_validation :set_default_photo_url

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

  DEFAULT_PHOTO_URL = '/assets/blank_figure.png'

  def name
    "#{first_name} #{last_name}"
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end

  def set_default_photo_url
    self.photo_url ||= DEFAULT_PHOTO_URL
  end
end
