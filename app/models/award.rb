class Award < ApplicationRecord
  belongs_to :scholarship
  belongs_to :scholarship_application, optional: true
end
