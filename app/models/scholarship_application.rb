class ScholarshipApplication < ApplicationRecord
  belongs_to :user
  belongs_to :scholarship
end
