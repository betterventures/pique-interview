# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  default_scope {
    where(role: :student)
  }

  belongs_to :school, optional: true
  has_many :parent_or_guardian_relationships,
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :student
  has_many :parent_or_guardians, through: :parent_or_guardian_relationships
  has_many :activities, inverse_of: :student, dependent: :destroy
  has_many :scholarship_applications, inverse_of: :student, dependent: :destroy
  has_many :applied_scholarships, through: :scholarship_applications, source: :scholarship

  # student nested attrs - eg Activities
  accepts_nested_attributes_for :activities,
                                reject_if: ->(attrs) {
                                  attrs['title'].nil?
                                },
                                allow_destroy: true
  accepts_nested_attributes_for :parent_or_guardian_relationships,
                                reject_if: :validate_and_fire_parent_or_guardian_update_hook!,
                                allow_destroy: true

  def gpa_string
    sprintf('%.2f', gpa.round(2))
  end

  def apply!(scholarship, stage=ScholarshipApplication.stages[:unscored])
    scholarship_applications.create!(
      scholarship_id: scholarship.id,
      student_id: id,
      stage: stage
    )
  end

  def to_json
    {
      id: id,
      name: name,
      description: tagline,
      gpa: gpa_string,
      image: photo_url,
      city: 'Washington',
      state: 'D.C.',
      highSchool: 'Benjamin Banneker HS',
      type: role,
      activities: activities.map(&:to_json),
    }
  end

  private

  def set_default_role
    self.role ||= self.class.roles[:student]
  end

  # really ugly was of allowing us to update parent relations
  # The problem: creating works fine but updating fails with taken email -
  # I can't seem to find a way to intercept parent_or_guardian_attributes= on
  # the UserToStudentRelationship relation.
  # So, check if the parent exists here using the provided hook -
  # only instead of rejecting, we use the hook to fire off an alternative update.
  #
  # In the future we probably shouldn't be updating data this way (through the student)
  # (or perhaps we should just separately create the parents first and then pass a find_by/id to the dummy data),
  # but for now w/e. We want to set up dummy data without knowing if the student exists yet.
  def validate_and_fire_parent_or_guardian_update_hook!(attrs)
    !UserToStudentRelationship.relationship_types.keys.include?(
      attrs['relationship_type'].to_s
    ) ||
    update_parent_or_guardian_if_exists?(attrs)
  end

  def update_parent_or_guardian_if_exists?(attrs)
    desired_parent_or_guardian = ParentOrGuardian.find_by(
      email: attrs['parent_or_guardian_attributes']['email'].downcase
    )
    # update or set guardian
    if self.parent_or_guardians.include?(desired_parent_or_guardian)
      desired_parent_or_guardian.update_attributes!(attrs['parent_or_guardian_attributes'])
    else
      new_parent_or_guardian = self.parent_or_guardians.build(attrs['parent_or_guardian_attributes'])
      new_parent_or_guardian.save!
    end
  end
end
