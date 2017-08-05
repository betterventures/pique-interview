# Scholarship administrator (within an organization)
# - belongs_to an :org
# - eventually may belong_to multiple orgs, thru :org_memberships (e.g. if reviewer for multiple orgs)
class Provider < User

  default_scope { where(role: :provider) }

  belongs_to :organization, optional: true
  has_many :scholarships, through: :organization

  scope :admin,    -> { where(admin: true) }
  scope :reviewer, -> { where(reviewer: true) }
  scope :accepted_invite, -> { where('invitation_accepted_at IS NOT NULL') }
  scope :accepted_reviewer, -> { reviewer.accepted_invite }

  def primary_scholarship
    scholarships.first
  end

  def has_saved_scholarship?
    scholarships.count > 0
  end

  def has_completed_scholarship?
    has_saved_scholarship? &&
      primary_scholarship.completed?
  end

  def administers?(scholarship_id)
    scholarship_ids.include?(scholarship_id)
  end

  def to_json
    {
      id: id,
      displayName: name,
      photoURL: photo_url,
      type: role,
      reviewer: reviewer,
      admin: admin,
    }
  end

  def photo_url
    self[:photo_url] || DEFAULT_PHOTO_URL
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:provider]
  end
end
