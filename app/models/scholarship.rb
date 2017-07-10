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
  has_many :application_questions, inverse_of: :scholarship, dependent: :destroy
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
  accepts_nested_attributes_for :application_questions,
                                reject_if: ->(attrs) {
                                  attrs['prompt'].nil? ||
                                  attrs['prompt'].empty?
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
  accepts_nested_attributes_for :scholarship_applications,
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

  validates :title, presence: true
  validates :description, presence: true
  validates :eligibility, presence: true
  validates :cycle_start, presence: true
  validates :cycle_end, presence: true
  validates :minimum_recommendations, presence: true

  # include nested attributes in JSON responses
  # NB: Very important to return the :id field for any nested attr,
  #     so that records are updated instead of created when the scholarship JSON is POSTed back.
  #     Same goes for :{parent}_id, so that nested attrs are correctly mapped (eg created and deleted).
  #     If your PUT/POST updates are not working, check that the parent_ids are present in the payload.
  def nested_options
    {
      include: {
        awards: { only: [:id, :amount], },
        organization: { only: [:id, :name, :address, :city, :state], },
        application_questions: { only: [:id, :scholarship_id, :prompt, :answer_type], },
        supplemental_requirements: { only: [:id, :title], },
        essay_requirements: {
          only: [:id, :scholarship_id, :word_limit],
          include: {
            essay_prompts: { only: [:id, :essay_requirement_id, :prompt], },
          },
        },
        score_card: {
          only: [:id, :scholarship_id],
          include: {
            score_card_fields: { only: [:id, :score_card_id, :title, :possible_score] },
          },
        },
        scholarship_applications: {
          only: [:id, :scholarship_id, :student_id, :stage],
          include: {
            ratings: {
              only: [:id, :scholarship_application_id, :rater_id, :comment],
              include: {
                fields: { only: [:id, :application_rating_id, :score_card_field_id, :score] },
                rater:  { only: [:id, :first_name, :last_name, :photo_url] },
              },
            },
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

  def cycle_start
    return self[:cycle_start].strftime(EXPECTED_DATE_FORMAT) if self[:cycle_start]
    nil
  end

  def cycle_end
    return self[:cycle_end].strftime(EXPECTED_DATE_FORMAT) if self[:cycle_end]
    nil
  end

  def cycle_start_str
    cycle_start
  end

  def cycle_end_str
    cycle_end
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
