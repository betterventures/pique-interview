class Scholarship < ApplicationRecord
  EXPECTED_DATE_FORMAT = "%m/%d/%Y"

  # applications
  has_many :scholarship_applications, inverse_of: :scholarship
  has_many :unscored_applications, -> { unscored }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'
  has_many :scored_applications, -> { scored }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'
  has_many :recipient_applications, -> { recipient }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'

  # applicants
  has_many :applicants, through: :scholarship_applications, source: :student
  has_many :unscored_applicants, through: :unscored_applications, source: :student
  has_many :scored_applicants, through: :scored_applications, source: :student
  has_many :recipient_applicants, through: :recipient_applications, source: :student

  # awards
  has_many :awards, inverse_of: :scholarship

  # requirements
  has_many :area_of_study_requirements, inverse_of: :scholarship, dependent: :destroy
  has_many :essay_requirements, inverse_of: :scholarship, dependent: :destroy
  has_many :location_limitations, inverse_of: :scholarship, dependent: :destroy
  has_many :supplemental_requirements, inverse_of: :scholarship, dependent: :destroy

  accepts_nested_attributes_for :awards,
                                reject_if: ->(attrs) {
                                  attrs['amount'].nil?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :area_of_study_requirements,
                                reject_if: ->(attrs) {
                                  attrs['aos_type'].nil? ||
                                  attrs['aos_type'].to_s == AreaOfStudyRequirement::TYPE_NO_REQUIREMENT.to_s
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :essay_requirements,
                                reject_if: ->(attrs) {
                                  attrs['word_limit'].nil?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :location_limitations,
                                reject_if: ->(attrs) {
                                  attrs['state'].nil? ||
                                  attrs['state'].empty?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :supplemental_requirements,
                                reject_if: ->(attrs) {
                                  attrs['title'].nil? ||
                                  attrs['title'].empty?
                                },
                                allow_destroy: true

  enum faith_requirement: {
    no_requirement: 0,
    arab: 1,
    muslim: 2,
    jewish: 3,
    christian: 4,
    catholic: 5
  }

  # provide the keys expected by the frontend, for now
  def self.by_location(*scholarships)
    {
      all: scholarships,
      national: scholarships,
      niche: [],
      local: [],
      based: [],
    }
  end

  # provide the keys expected by the frontend, for now
  def applications_by_stage
    {
      unscored: unscored_applications,
      scored: scored_applications,
      recipients: recipient_applications,
    }
  end

  # not derived from `applications_by_stage` in order to reduce query count
  # - `map` would execute n={collection_size} queries
  def applicants_by_stage
    {
      unscored: unscored_applicants,
      scored: scored_applicants,
      recipients: recipient_applicants,
    }
  end

  # applicants in json format
  def applicants_by_stage_json
    applicants_by_stage.reduce({}) do |acc, el|
      key, applicants = el
      acc[key] = applicants.map(&:to_json)
      acc
    end
  end

  def cycle_start=(start_time)
    super time_to_date(start_time)
  end

  def cycle_end=(end_time)
    super time_to_date(end_time)
  end

  def cycle_start_str
    !!@cycle_start && @cycle_start.strftime(EXPECTED_DATE_FORMAT)
  end

  def cycle_end_str
    !!@cycle_end && @cycle_end.strftime(EXPECTED_DATE_FORMAT)
  end

  private

  def time_to_date(time_obj)
    case time_obj.class.to_s
    when Date.to_s || DateTime.to_s
      time_obj
    when String.to_s && !time_obj.empty?
      Date.strptime(time_obj, EXPECTED_DATE_FORMAT)
    else
      nil
    end
  end
end
