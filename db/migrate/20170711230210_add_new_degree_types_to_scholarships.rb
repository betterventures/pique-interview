class AddNewDegreeTypesToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_program_none, :boolean
    add_column :scholarships, :for_program_collect, :boolean
  end
end
