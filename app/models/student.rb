# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  default_scope {
    where(role: :student)
  }

  belongs_to :school, optional: true
  has_many :parent_or_guardian_relationships,
            -> { where('relationship_type IN (?)',
              [
                UserToStudentRelationship.relationship_types[:mother],
                UserToStudentRelationship.relationship_types[:father],
                UserToStudentRelationship.relationship_types[:guardian],
              ]
            ) },
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :student
  has_many :parent_or_guardians, through: :parent_or_guardian_relationships
  has_many :counselor_relationships,
            -> { where(relationship_type: UserToStudentRelationship.relationship_types[:counselor]) },
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :student
  has_many :counselors, through: :counselor_relationships
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
  accepts_nested_attributes_for :counselor_relationships,
                                reject_if: :validate_and_fire_counselor_update_hook!,
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

  # really ugly way of allowing us to update parent relations
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
    attrs['relationship_type'].to_s.nil? ||
    attrs['relationship_type'].to_s.empty? ||
    !UserToStudentRelationship.relationship_types.keys.include?(
      attrs['relationship_type'].to_s
    ) ||
    update_parent_or_guardian_if_exists?(attrs)
  end

  def update_parent_or_guardian_if_exists?(attrs)
    desired_parent_or_guardian = ParentOrGuardian.find_by(
      email: attrs['parent_or_guardian_attributes']['email'].downcase
    )

    # proceed with creation via nested_attrs if parent_or_guardian does not yet exist
    return false if !desired_parent_or_guardian

    # assign if exists and not already related
    if !self.parent_or_guardians.include?(desired_parent_or_guardian)
      self.parent_or_guardians.push(desired_parent_or_guardian)
    end

    # updated and save any new relations if exists
    desired_parent_or_guardian.update_attributes!(attrs['parent_or_guardian_attributes'])
  end

  def validate_and_fire_counselor_update_hook!(attrs)
    attrs['relationship_type'].to_s.nil? ||
    attrs['relationship_type'].to_s.empty? ||
    !UserToStudentRelationship.relationship_types.keys.include?(
      attrs['relationship_type'].to_s
    ) ||
    update_counselor_if_exists?(attrs)
  end

  def update_counselor_if_exists?(attrs)
    desired_counselor = Counselor.find_by(
      email: attrs['counselor_attributes']['email'].downcase
    )

    # proceed with creation via nested_attrs if counselor does not yet exist
    return false if !desired_counselor

    # assign if exists and not already related
    if !self.counselors.include?(desired_counselor)
      self.counselors.push(desired_counselor)
    end

    # updated and save any new relations if exists
    desired_counselor.update_attributes!(attrs['counselor_attributes'])
  end
end
