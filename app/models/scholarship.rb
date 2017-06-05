class Scholarship < ApplicationRecord
  EXPECTED_DATE_FORMAT = "%m/%d/%Y"

  # org
  belongs_to :organization, optional: true

  # applications
  has_many :scholarship_applications, inverse_of: :scholarship
  has_many :unscored_applications, -> { unscored }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'
  has_many :scored_applications, -> { scored }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'
  has_many :awarded_applications, -> { awarded }, inverse_of: :scholarship, class_name: 'ScholarshipApplication'

  # applicants
  has_many :applicants, through: :scholarship_applications, source: :student
  has_many :unscored_applicants, through: :unscored_applications, source: :student
  has_many :scored_applicants, through: :scored_applications, source: :student
  has_many :awarded_applicants, through: :awarded_applications, source: :student

  # score_cards
  has_one :score_card, inverse_of: :scholarship, dependent: :destroy

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
  accepts_nested_attributes_for :score_card,
                                reject_if: ->(attrs) {
                                  attrs['scholarship_id'].nil?
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

  validates :title, presence: true
  validates :description, presence: true
  validates :eligibility, presence: true
  validates :cycle_start, presence: true
  validates :cycle_end, presence: true
  validates :minimum_recommendations, presence: true

  # include nested attributes in JSON responses
  def nested_options
    {
      include: {
        awards: { only: [:amount], },
        organization: { only: [:name, :address, :city, :state], },
        supplemental_requirements: { only: [:id, :title], },
        essay_requirements: {
          only: [:id, :word_limit],
          include: {
            essay_prompts: { only: [:id, :prompt], },
          },
        },
        score_card: {
          only: [:id],
          include: {
            score_card_fields: { only: [:id, :title, :possible_score] },
          },
        },
      }
    }
  end
  def to_json(options={})
    super(
      nested_options
        .merge(options)
    )
  end
  def as_json(options={})
    super(
      nested_options
        .merge(options)
    )
  end

  # provide the keys expected by the frontend, for now
  def self.by_location(scholarships)
    # allow passing in an array or single scholarship
    s = Array(scholarships)
    {
      all: s,
      national: s,
      niche: [],
      local: [],
      based: [],
    }
  end

  # provide the keys expected by the frontend, for now
  def applications_by_stage
    {
      all: scholarship_applications,
      unscored: unscored_applications,
      scored: scored_applications,
      awarded: awarded_applications,
    }
  end

  # not derived from `applications_by_stage` in order to reduce query count
  # - `map` would execute n={collection_size} queries
  def applicants_by_stage
    {
      all: applicants,
      unscored: unscored_applicants,
      scored: scored_applicants,
      awarded: awarded_applicants,
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
    !!cycle_start && cycle_start.strftime(EXPECTED_DATE_FORMAT)
  end

  def cycle_end_str
    !!cycle_end && cycle_end.strftime(EXPECTED_DATE_FORMAT)
  end

  private

  def time_to_date(time_obj)
    case time_obj.class.to_s
    when (Date.to_s || DateTime.to_s)
      time_obj
    when String.to_s
      return nil if time_obj.empty?  # submitting an empty date
      Date.strptime(time_obj, EXPECTED_DATE_FORMAT)
    else
      nil
    end
  end
end
