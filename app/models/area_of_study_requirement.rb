class AreaOfStudyRequirement < ApplicationRecord
  belongs_to :scholarship

  TYPE_NO_REQUIREMENT = :no_requirement

  enum aos_type: {
    TYPE_NO_REQUIREMENT => 0,
    biological_sciences: 1,
    computer_science: 2,
    engineering: 3,
    economics: 4,
    physical_sciences: 5
  }

end
