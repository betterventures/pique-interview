class UserToStudentRelationship < ApplicationRecord
  # for lack of a better method at present,
  # we allow this class to belong to both :parent_or_guardian and :counselor,
  # allow optionality, and back ourselves up with a custom validation
  belongs_to :student, inverse_of: :parent_or_guardian_relationships

  # can use the same inverse_of :name,
  # as the method is looked for on the referenced class
  belongs_to :counselor, optional: true, inverse_of: :student_relationships
  belongs_to :parent_or_guardian, optional: true, inverse_of: :student_relationships

  validate :expect_either_parent_or_counselor!, on: :create

  # reflects the type of the :user above
  enum relationship_type: {
    mother:     0,
    father:     1,
    guardian:   2,
    counselor:  3,
  }

  accepts_nested_attributes_for :parent_or_guardian,
                                reject_if: ->(attrs) {
                                  attrs['email'].nil? ||
                                  attrs['email'].empty?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :counselor,
                                reject_if: ->(attrs) {
                                  attrs['email'].nil? ||
                                  attrs['email'].empty?
                                },
                                allow_destroy: true

  private

  def expect_either_parent_or_counselor!
    unless parent_or_guardian.present? || counselor.present?
      errors.add(
        :base,
        ': Either parent_or_guardian_id or counselor_id must be populated'
      )
    end
  end
end
