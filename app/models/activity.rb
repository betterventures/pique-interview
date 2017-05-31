class Activity < ApplicationRecord
  belongs_to :student, class_name: 'Student', inverse_of: :activities

  validates :student, presence: true
  validates :title, presence: true
end
