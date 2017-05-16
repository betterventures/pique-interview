class Scholarship < ApplicationRecord
  EXPECTED_DATE_FORMAT = "%m/%d/%Y"

  has_many :area_of_study_requirements, inverse_of: :scholarship, dependent: :destroy
  has_many :essay_requirements, inverse_of: :scholarship, dependent: :destroy
  has_many :location_limitations, inverse_of: :scholarship, dependent: :destroy
  has_many :supplemental_requirements, inverse_of: :scholarship, dependent: :destroy

  accepts_nested_attributes_for :area_of_study_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true
  accepts_nested_attributes_for :essay_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true
  accepts_nested_attributes_for :location_limitations,
                                reject_if: :all_blank,
                                allow_destroy: true
  accepts_nested_attributes_for :supplemental_requirements,
                                reject_if: :all_blank,
                                allow_destroy: true

  enum faith_requirement: {
    no_requirement: 0,
    arab: 1,
    muslim: 2,
    jewish: 3,
    christian: 4,
    catholic: 5
  }

  def cycle_start=(start_time)
    super time_to_date(start_time)
  end

  def cycle_end=(end_time)
    super time_to_date(end_time)
  end

  def cycle_start_str
    cycle_start.strftime(EXPECTED_DATE_FORMAT)
  end

  def cycle_end_str
    cycle_end.strftime(EXPECTED_DATE_FORMAT)
  end

  private

  def time_to_date(time_obj)
    case time_obj.class.to_s
    when Date.to_s || DateTime.to_s
      time_obj
    when String.to_s
      Date.strptime(time_obj, EXPECTED_DATE_FORMAT)
    else
      fail
    end
  end
end
