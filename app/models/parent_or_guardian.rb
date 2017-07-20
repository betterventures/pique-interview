class ParentOrGuardian < User

  default_scope {
    where(role: :parent_or_guardian)
  }

  has_many :student_relationships,
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :parent_or_guardian
  has_many :students, through: :student_relationships

end
