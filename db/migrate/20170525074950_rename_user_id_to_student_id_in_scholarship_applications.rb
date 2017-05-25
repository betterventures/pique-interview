class RenameUserIdToStudentIdInScholarshipApplications < ActiveRecord::Migration[5.0]
  def change
    rename_column :scholarship_applications, :user_id, :student_id
  end
end
