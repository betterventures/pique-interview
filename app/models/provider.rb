# Scholarship administrator (within an organization)
class Provider < User
  belongs_to :organization, optional: true

  private

  def set_default_role
    self.role ||= Role.provider
  end
end
