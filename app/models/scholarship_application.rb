class ScholarshipApplication < ApplicationRecord
  belongs_to :student, inverse_of: :scholarship_applications
  belongs_to :scholarship, inverse_of: :scholarship_applications

  # validate that student cannot apply to the same scholarship more than once
  validates :scholarship_id, uniqueness: { scope: :student_id }
end
