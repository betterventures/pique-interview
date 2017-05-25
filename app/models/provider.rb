# Scholarship administrator (within an organization)
# - belongs_to an :org
# - eventually may belong_to multiple orgs, thru :org_memberships (e.g. if reviewer for multiple orgs)
class Provider < User

  default_scope { where(role: :provider) }

  belongs_to :organization, optional: true

  def to_json
    {
      photo_url: photo_url,
      display_name: name,
    }
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:provider]
  end
end
