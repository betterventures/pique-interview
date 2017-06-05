class ScoreCardField < ApplicationRecord
  belongs_to :score_card

  validates :title, presence: true
  validates :possible_score, presence: true
end
