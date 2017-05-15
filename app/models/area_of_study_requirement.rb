class AreaOfStudyRequirement < ApplicationRecord
  belongs_to :scholarship

  enum type: {
    biological_sciences: 0,
    computer_science: 1,
    engineering: 2,
    economics: 3,
    physical_sciences: 4
  }
end
