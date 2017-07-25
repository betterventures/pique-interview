class ScholarshipApplication < ApplicationRecord
  belongs_to :student, class_name: 'Student', inverse_of: :scholarship_applications
  belongs_to :scholarship, inverse_of: :scholarship_applications

  has_many :ratings, class_name: 'ApplicationRating', inverse_of: :scholarship_application, dependent: :destroy
  has_one :award

  # validate that student cannot apply to the same scholarship more than once
  validates :scholarship_id, uniqueness: { scope: :student_id }

  accepts_nested_attributes_for :ratings,
                                reject_if: :all_blank,
                                allow_destroy: true

  scope :for_scholarship, -> (scholarship_id) {
    where(scholarship_id: scholarship_id)
  }
  scope :scored_by, -> (user_id) {
    # overarching `where` clause goes last: https://stackoverflow.com/questions/32753168/rails-5-activerecord-or-query
    includes(:ratings)
      .references(:ratings)
      .where(application_ratings: { rater_id: user_id })
  }
  scope :awarded, -> {
    # getting count of Awards: https://stackoverflow.com/questions/20183710/find-all-records-which-have-a-count-of-an-association-greater-than-zero
    # must group by both table ids
    joins(:award)
      .group('awards.id, scholarship_applications.id')
      .having('count(awards.id) > 0')
  }

  private

  def set_initial_stage
    self.stage ||= self.class.stages[:unscored]
  end
end
