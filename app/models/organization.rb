# Scholarship organization
class Organization < ApplicationRecord
  has_many :providers
  has_many :scholarships
end
