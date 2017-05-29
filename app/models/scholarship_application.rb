class ScholarshipApplication < ApplicationRecord
  belongs_to :student, inverse_of: :scholarship_applications
  belongs_to :scholarship, inverse_of: :scholarship_applications

  # validate that student cannot apply to the same scholarship more than once
  validates :scholarship_id, uniqueness: { scope: :student_id }

  # leave space for intermediate stages
  # - allow for new stages to be added
  # - while preserving backwards-compatibility with existing data
  # - enables queries like: `where('stage > 6')`
  enum stage: {
    unscored: 0,
    scored: 10,
    recipient: 100,
  }

  private

  def set_initial_stage
    self.stage ||= self.class.stages[:unscored]
  end
end
