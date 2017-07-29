class HonorOrAward < ApplicationRecord
  belongs_to :student, class_name: 'Student', inverse_of: :activities
end
