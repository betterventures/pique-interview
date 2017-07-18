class EssayRequirement < ApplicationRecord
  belongs_to :scholarship

  validates :prompt, presence: true
end
