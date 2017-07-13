# Scholarship administrator (within an organization)
# - belongs_to an :org
# - eventually may belong_to multiple orgs, thru :org_memberships (e.g. if reviewer for multiple orgs)
class Provider < User

  default_scope { where(role: :provider) }

  belongs_to :organization, optional: true
  has_many :scholarships, through: :organization

  def primary_scholarship
    scholarships.first
  end

  def has_saved_scholarship?
    scholarships.count > 0
  end

  def has_completed_scholarship?
  end

  def to_json
    {
      id: id,
      displayName: name,
      photoURL: photo_url || DEFAULT_PHOTO_URL,
      type: role,
    }
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:provider]
  end
end
