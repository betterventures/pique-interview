class UserToStudentRelationship < ApplicationRecord
  # for lack of a better method at present,
  # we allow this class to belong to both :parent_or_guardian and :counselor,
  # allow optionality, and back ourselves up with a custom validation
  belongs_to :student
  belongs_to :counselor, optional: true
  belongs_to :parent_or_guardian, optional: true

  validate :expect_either_parent_or_counselor!

  # reflects the type of the :user above
  enum relationship_type: {
    mother:     0,
    father:     1,
    guardian:   2,
    counselor:  3,
  }

  private

  def expect_either_parent_or_counselor!
    unless parent_or_guardian_id.present? || counselor_id.present?
      errors.add(
        :parent_or_guardian_id,
        ': Either parent_or_guardian_id or counselor_id must be populated'
      )
      errors.add(
        :counselor_id,
        ': Either parent_or_guardian_id or counselor_id must be populated'
      )
    end
  end
end
