class AddScholarshipCycleToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :cycle_start, :date
    add_column :scholarships, :cycle_end, :date
  end
end
