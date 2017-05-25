# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end
end
