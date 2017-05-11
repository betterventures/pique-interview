# Scholarship administrator (within an organization)
class Provider < User
  belongs_to :organization, optional: true
end
