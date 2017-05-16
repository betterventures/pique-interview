class AddFaithBasedRequirementToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :faith_requirement, :integer, default: 0
  end
end
