class ScoreCard < ApplicationRecord
  belongs_to :scholarship

  has_many :score_card_fields, inverse_of: :score_card, dependent: :destroy

  accepts_nested_attributes_for :score_card_fields,
                                reject_if: ->(attrs) {
                                  attrs['title'].nil? || attrs['title'].empty? ||
                                  attrs['possible_score'].nil? || attrs['possible_score'].empty?
                                },
                                allow_destroy: true
end
