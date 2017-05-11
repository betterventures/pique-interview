class Role < ApplicationRecord
  has_many :users, dependent: :destroy

  PROVIDER_TYPE = 1
end
