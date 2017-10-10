class Educator < User

  default_scope {
    where(role: :educator)
  }
 
end