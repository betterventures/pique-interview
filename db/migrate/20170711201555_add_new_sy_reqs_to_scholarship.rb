class AddNewSyReqsToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_hs_none, :boolean
    add_column :scholarships, :for_hs_collect, :boolean
  end
end
