class AddNewEthnicitiesToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_people_middle_eastern, :boolean
    add_column :scholarships, :for_people_none, :boolean
    add_column :scholarships, :for_people_collect, :boolean
  end
end
