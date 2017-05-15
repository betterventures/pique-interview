class Scholarship < ApplicationRecord
  has_many :area_of_study_requirements, inverse_of: :scholarship, dependent: :destroy
  has_many :location_limitations, inverse_of: :scholarship, dependent: :destroy
  has_many :supplemental_requirements, inverse_of: :scholarship, dependent: :destroy

  accepts_nested_attributes_for :area_of_study_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true
  accepts_nested_attributes_for :location_limitations,
                                reject_if: :all_blank,
                                allow_destroy: true
  accepts_nested_attributes_for :supplemental_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true
end
