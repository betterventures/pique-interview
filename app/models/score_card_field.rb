class ScoreCardField < ApplicationRecord
  belongs_to :score_card

  validates :title, presence: true
  validates :possible_score, presence: true

  has_many :application_rating_fields, inverse_of: :score_card_field, dependent: :destroy
end
