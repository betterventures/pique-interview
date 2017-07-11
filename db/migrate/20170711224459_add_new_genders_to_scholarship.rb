class AddNewGendersToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_gender_trans, :boolean
    add_column :scholarships, :for_gender_nonbinary, :boolean
    add_column :scholarships, :for_gender_none, :boolean
    add_column :scholarships, :for_gender_collect, :boolean
  end
end
