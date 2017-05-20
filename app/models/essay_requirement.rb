class EssayRequirement < ApplicationRecord
  belongs_to :scholarship
  has_many :essay_prompts, inverse_of: :essay_requirement, dependent: :destroy

  accepts_nested_attributes_for :essay_prompts,
                                reject_if: ->(attrs) {
                                  attrs['prompt'].nil? ||
                                  attrs['prompt'].empty?
                                },
                                allow_destroy: true
end
