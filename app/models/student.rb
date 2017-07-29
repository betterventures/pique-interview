# Scholarship Applicant or Viewer
# - eventually will belong_to a :school
class Student < User

  default_scope {
    where(role: :student)
  }

  belongs_to :school, optional: true
  has_many :parent_or_guardian_relationships,
            -> { where(relationship_type: [
                UserToStudentRelationship.relationship_types[:mother],
                UserToStudentRelationship.relationship_types[:father],
                UserToStudentRelationship.relationship_types[:guardian],
            ])},
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
  has_many :honors_and_awards, inverse_of: :student, dependent: :destroy, class_name: 'HonorOrAward'
  has_many :scholarship_applications, inverse_of: :student, dependent: :destroy
  has_many :applied_scholarships, through: :scholarship_applications, source: :scholarship

  # student nested attrs - eg Activities
  accepts_nested_attributes_for :activities,
                                reject_if: :validate_and_fire_activities_update_hook!,
                                allow_destroy: true
  accepts_nested_attributes_for :honors_and_awards,
                                reject_if: :validate_and_fire_honors_and_awards_update_hook!,
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

  def apply!(scholarship)
    scholarship_applications.create!(
      scholarship_id: scholarship.id,
      student_id: id,
    )
  end

  def to_json
    {
      id: id,
      name: name,
      description: tagline,
      intro: description,
      gpa: gpa_string,
      birthdate: birthdate,
      email: email,
      phone: phone,
      image: photo_url,
      street: '646 Franklin St. NE',
      city: 'Washington',
      state: 'D.C.',
      highSchool: 'Benjamin Banneker HS',
      type: role,
      activities: activities.map(&:to_json),
      honors_and_awards: honors_and_awards.map(&:to_json),
      parent_or_guardian_relationships: parent_or_guardian_relationships.map(&:to_json),
      counselor_relationships: counselor_relationships.map(&:to_json),
      school: school,
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
    update_parent_or_guardian_if_exists?(
      attrs['parent_or_guardian_attributes'],
      attrs['relationship_type'],
    )
  end

  def update_parent_or_guardian_if_exists?(attrs, relationship_type)
    desired_parent_or_guardian = ParentOrGuardian.find_by(
      email: attrs['email'].downcase
    )

    # proceed with creation via nested_attrs if parent_or_guardian does not yet exist
    return false if !desired_parent_or_guardian

    # assign if exists and not already related
    if !self.parent_or_guardians.include?(desired_parent_or_guardian)
      self.parent_or_guardian_relationships.build(
        parent_or_guardian: desired_parent_or_guardian,
        relationship_type: relationship_type,
      )
    end

    # updated and save any new relations if exists
    desired_parent_or_guardian.update_attributes!(attrs)
  end

  def validate_and_fire_counselor_update_hook!(attrs)
    attrs['relationship_type'].to_s.nil? ||
    attrs['relationship_type'].to_s.empty? ||
    !UserToStudentRelationship.relationship_types.keys.include?(
      attrs['relationship_type'].to_s
    ) ||
    update_counselor_if_exists?(attrs['counselor_attributes'])
  end

  def update_counselor_if_exists?(attrs)
    desired_counselor = Counselor.find_by(
      email: attrs['email'].downcase
    )

    # proceed with creation via nested_attrs if counselor does not yet exist
    return false if !desired_counselor

    # assign if exists and not already related
    if !self.counselors.include?(desired_counselor)
      self.counselors.push(desired_counselor)
    end

    # updated and save any new relations if exists
    desired_counselor.update_attributes!(attrs)
  end

  # it occurs that an alternative way to update these nested models for the dummy students
  # - for now - is to trash the relations before regenerating them.
  # Of course this would not work for eg assigning a counselor to multiple students
  # (since we still want to search the global namespace for the right counselor),
  # but it would work for Activities. Ah well. This is probably better.
  def validate_and_fire_activities_update_hook!(attrs)
    attrs['title'].nil? ||
    attrs['title'].empty? ||
    update_activity_if_exists_on_student?(attrs)
  end

  # match any existing activities the student has
  def update_activity_if_exists_on_student?(attrs)
    desired_activity = self.activities.find_by(title: attrs['title'])

    # proceed with creation if activity does not yet exist on student
    return false if !desired_activity

    # update the activity if it exists on the student
    desired_activity.update_attributes!(attrs)
  end

  def validate_and_fire_honors_and_awards_update_hook!(attrs)
    attrs['title'].nil? ||
    attrs['title'].empty? ||
    attrs['provider_name'].nil? ||
    attrs['provider_name'].empty? ||
    update_honor_or_award_if_exists_on_student?(attrs)
  end

  # for this, may be better to just trash the Honors,
  # as we may not have a reliable identifier
  def update_honor_or_award_if_exists_on_student?(attrs)
    desired_honor = self.honors_and_awards.find_by(title: attrs['title'])

    return false if !desired_honor

    desired_honor.update_attributes!(attrs)
  end

end
