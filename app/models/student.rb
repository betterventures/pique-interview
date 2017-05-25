# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  has_many :scholarship_applications, inverse_of: :user, dependent: :destroy
  has_many :applied_scholarships, through: :scholarship_applications, source: :scholarship

  def gpa_string
    sprintf('%.2f', @gpa.round(2))
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
