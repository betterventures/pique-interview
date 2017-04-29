class Scholarship < ApplicationRecord
  has_many :location_limitations, inverse_of: :scholarship
  accepts_nested_attributes_for :location_limitations, reject_if: :all_blank,
                                                       allow_destroy: true
  accepts_nested_attributes_for :supplemental_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true
end
