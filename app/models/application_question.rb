class ApplicationQuestion < ApplicationRecord
  belongs_to :scholarship

  enum answer_type: {
    long: 0,
    short: 1,
  }
end
