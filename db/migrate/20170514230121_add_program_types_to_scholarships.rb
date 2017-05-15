class AddProgramTypesToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_two_year_program, :boolean
    add_column :scholarships, :for_four_year_program, :boolean
  end
end
