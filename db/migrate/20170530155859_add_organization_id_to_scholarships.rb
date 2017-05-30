class AddOrganizationIdToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_reference :scholarships, :organization, foreign_key: true
  end
end
