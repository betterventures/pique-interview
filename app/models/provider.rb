# Scholarship administrator (within an organization)
class Provider < User
  belongs_to :organization, optional: true

  private

  def set_default_role
    self.role ||= self.role_types[:provider]
  end
end
