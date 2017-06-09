class ApplicationRating < ApplicationRecord
  belongs_to :rater, class_name: 'Provider', foreign_key: :rater_id
  belongs_to :scholarship_application, inverse_of: :ratings

  has_one :scholarship, through: :scholarship_application
  has_one :score_card, through: :scholarship
  has_many :fields, class_name: 'ApplicationRatingField', inverse_of: :application_rating, dependent: :destroy

  accepts_nested_attributes_for :fields,
                                reject_if: ->(attrs) {
                                  attrs['score_card_field_id'].nil?
                                },
                                allow_destroy: true
end
