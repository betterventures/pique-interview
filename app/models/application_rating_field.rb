class ApplicationRatingField < ApplicationRecord
  belongs_to :application_rating, inverse_of: :fields
  belongs_to :score_card_field, inverse_of: :application_rating_fields
end
