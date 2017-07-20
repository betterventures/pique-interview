class ParentOrGuardian < User

  default_scope {
    where(role: :parent_or_guardian)
  }

  has_many :student_relationships, class_name: 'UserToStudentRelationship'
  has_many :students, through: :student_relationships

end
