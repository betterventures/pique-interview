# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  default_scope {
    where(role: :student)
  }

  has_many :parent_or_guardian_relationships,
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :student
  has_many :parent_or_guardians, through: :parent_or_guardian_relationships
  has_many :activities, inverse_of: :student, dependent: :destroy
  has_many :scholarship_applications, inverse_of: :student, dependent: :destroy
  has_many :applied_scholarships, through: :scholarship_applications, source: :scholarship

  # student nested attrs - eg Activities
  accepts_nested_attributes_for :activities,
                                reject_if: ->(attrs) {
                                  attrs['title'].nil?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :parent_or_guardian_relationships,
                                reject_if: ->(attrs) {
                                  !UserToStudentRelationship.relationship_types.keys.include?(
                                    attrs['relationship_type'].to_s
                                  )
                                },
                                allow_destroy: true

  def gpa_string
    sprintf('%.2f', gpa.round(2))
  end

  def apply!(scholarship, stage=ScholarshipApplication.stages[:unscored])
    scholarship_applications.create!(
      scholarship_id: scholarship.id,
      student_id: id,
      stage: stage
    )
  end

  def to_json
    {
      id: id,
      name: name,
      description: tagline,
      gpa: gpa_string,
      image: photo_url,
      city: 'Washington',
      state: 'D.C.',
      highSchool: 'Benjamin Banneker HS',
      type: role,
      activities: activities.map(&:to_json),
    }
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
