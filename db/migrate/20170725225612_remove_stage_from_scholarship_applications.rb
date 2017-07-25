class RemoveStageFromScholarshipApplications < ActiveRecord::Migration[5.0]
  def change
    # stage is now determined by ratings and awards
    remove_column :scholarship_applications, :stage
  end
end
