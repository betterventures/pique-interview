class AddStageToScholarshipApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarship_applications, :stage, :integer, default: 0
  end
end
