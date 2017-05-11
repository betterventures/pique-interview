class Role < ApplicationRecord
  has_many :users, dependent: :destroy

  PROVIDER_ROLE = 'provider'
  RECOMMENDER_ROLE = 'recommender'
  REVIEWER_ROLE = 'reviewer'
  STUDENT_ROLE = 'student'

  ROLE_TYPES = [
    PROVIDER_ROLE,
    RECOMMENDER_ROLE,
    REVIEWER_ROLE,
    STUDENT_ROLE
  ]

  # Role type helpers
  # fetch the desired Role record - e.g. `Role.provider`
  scope :provider, -> { where(name: PROVIDER_ROLE).first }
  scope :recommender, -> { where(name: RECOMMENDER_ROLE).first }
  scope :reviewer, -> { where(name: REVIEWER_ROLE).first }
  scope :student, -> { where(name: STUDENT_ROLE).first }

end
