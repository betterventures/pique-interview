class Scholarship < ApplicationRecord
  EXPECTED_DATE_FORMAT = "%m/%d/%Y"

  # this hash maps the names of steps as displayed in the URL bar to
  # the name of the DB attribute that tracks if that step has been completed
  # for this scholarship.
  #
  # This allows us to change the public-facing name of a step
  # while maintaining knowledge of if that step was completed.
  #
  # NB: An alternative to this entire approach would be to forego DB attrs and
  #     infer whether a step was completed by which attrs are complete.
  #     This would likely involve a 'defining attr' for each step that is then
  #     checked by the `completed_step_` method.
  #
  # Usage:
  # PUBLIC-FACING NAME          =>    STATIC DB ATTR
  # *CHANGE ME*                 =>    *DO NOT CHANGE ME*
  # (and remember to change           (unless you want to
  #  names of partials)                migrate the database)

  FORM_STEPS_TO_DB_ATTRS = {
    :general                    =>    :general,
    :essay                      =>    :essay,
    :audience                   =>    :audience,
    :application_questions      =>    :application_questions,
    :supplemental               =>    :supplemental,
  }

  # db_attr_suffix      =>    Question Text
  GENERAL_APPLICATION_QUESTIONS = {
    :college            =>    "List of Colleges Student Intends to Apply To",
    :accepted_college   =>    "Name of College Student Was Accepted To And Will Attend",
    :birthplace         =>    "City & State of Birth",
    :parent_occupation  =>    "Parent(s)/Guardian's Occupation & Name of Employer",
    :hs_ceremony_date   =>    "High School Scholarship Award Ceremony Date",
  }

  # db_attr_suffix    =>    Name of Document
  GENERAL_SUPPLEMENTAL_DOCUMENTS = {
    :birth              =>    "Copy of Birth Certificate",
    :acceptance         =>    "College Acceptance Letter",
    :consent            =>    "Signed Scholarship Consent Form",
  }

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
  has_many :org_provided_documents, inverse_of: :scholarship, dependent: :destroy

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
  accepts_nested_attributes_for :org_provided_documents,
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
    no_preference: 0,
    arab: 1,
    muslim: 2,
    jewish: 3,
    christian: 4,
    catholic: 5,
  }

  validates :title, presence: true
  validates :description, presence: true
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
        org_provided_documents: { only: [:id, :title, :filepicker_url], },
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
  def general_app_question_json
    GENERAL_APPLICATION_QUESTIONS.reduce([]) do |arr, app_question|
      db_attr, prompt = app_question
      if self.send("app_ques_#{db_attr}".to_sym)
        arr << { prompt: prompt + ':' }
      end

      arr
    end
  end
  def general_supp_document_json
    GENERAL_SUPPLEMENTAL_DOCUMENTS.reduce([]) do |arr, supp_doc|
      db_attr, document_title = supp_doc
      if self.send("supp_doc_#{db_attr}".to_sym)
        arr << { title: document_title }
      end

      arr
    end
  end
  # convert flags (eg general app questions), into JSON.
  # for the purposes for standardizing text on the server-side,
  # rather than having to maintain text translation on the client side.
  def boolean_document_flags_to_json
    # return a hash with the JSON under a corresponding key
    {
      general_application_questions: general_app_question_json,
      general_supplemental_documents: general_supp_document_json,
    }
  end
  def to_json(options={})
    super(
      nested_options
        .merge(options)
    )
    .merge(boolean_document_flags_to_json)
  end
  def as_json(options={})
    super(
      nested_options
        .merge(options)
    )
    .merge(boolean_document_flags_to_json)
  end

  def self.form_steps
    FORM_STEPS_TO_DB_ATTRS.keys
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

  # Relies on the ordering of FORM_STEPS_TO_DB_ATTRS and the `completed_step_x`
  # naming convention to determine which steps have been completed.
  # Returns the first step for which the value of `completed_step_x` is false.
  def next_incomplete_step
    FORM_STEPS_TO_DB_ATTRS.each do |step, db_attr|
      return step unless self.send("completed_step_#{db_attr}".to_sym)
    end

    return nil
  end

  def completed?
    !next_incomplete_step
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
