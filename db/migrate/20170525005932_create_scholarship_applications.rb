class CreateScholarshipApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :scholarship_applications do |t|
      t.references :user, foreign_key: true
      t.references :scholarship, foreign_key: true

      t.timestamps
    end
  end
end
