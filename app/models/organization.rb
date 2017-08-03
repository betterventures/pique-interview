# Scholarship organization
class Organization < ApplicationRecord
  has_many :providers
  has_many :scholarships
  has_many :administrators, -> { admin }, class_name: 'Provider'
  has_many :reviewers, -> { reviewer }, class_name: 'Provider'
end
