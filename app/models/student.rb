# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  default_scope { where(role: :student) }

  has_many :scholarship_applications, inverse_of: :student, dependent: :destroy
  has_many :applied_scholarships, through: :scholarship_applications, source: :scholarship

  def gpa_string
    sprintf('%.2f', @gpa.round(2))
  end

  def apply!(scholarship)
    scholarship_applications.create!(scholarship_id: scholarship.id, student_id: id)
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
