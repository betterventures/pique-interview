class Counselor < User

  default_scope {
    where(role: :counselor)
  }

  has_many :student_relationships,
            class_name: 'UserToStudentRelationship',
            dependent: :destroy,
            inverse_of: :counselor
  has_many :students, through: :student_relationships

end
