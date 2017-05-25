class IndexScholarshipApplicationsOnStudentAndScholarship < ActiveRecord::Migration[5.0]
  def change
    add_index :scholarship_applications, [:scholarship_id, :student_id], unique: true
  end
end
