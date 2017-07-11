class AddNewCitizenshipReqsToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_us_refugee, :boolean
    add_column :scholarships, :for_us_permanent, :boolean
    add_column :scholarships, :for_us_undocumented, :boolean
    add_column :scholarships, :for_us_other, :boolean
    add_column :scholarships, :for_us_none, :boolean
    add_column :scholarships, :for_us_collect, :boolean
  end
end
