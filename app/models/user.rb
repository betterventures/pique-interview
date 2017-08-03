class User < ApplicationRecord
  before_validation :set_default_role
  before_validation :set_default_photo_url

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :invitable

  # please note if you change the key name, to keep the int the same
  # (for backwards compatibility)
  enum role: {
    provider:             0,   # providers (admin) and reviewers
    counselor:            1,   # counselors (admin) and recommenders
    student:              2,   # applicants
    parent_or_guardian:   3,   # parents_and_guardians
    educator:             4,   # other educator
  }

  enum gender: {
    female: 0,
    male: 1,
  }

  enum race: {
    african_american: 0,
    asian_american: 1,
    latino: 2,
    white: 3,
  }

  enum citizenship: {
    us_citizen: 0,
  }

  enum degree_type: {
    four_year: 0,
    two_year: 1,
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
