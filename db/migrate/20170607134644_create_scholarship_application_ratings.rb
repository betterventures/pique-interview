class CreateScholarshipApplicationRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :application_ratings do |t|
      t.references :scholarship_application, foreign_key: true
      t.references :rater, foreign_key: { to_table: :users }
      t.text :comment
      t.timestamps
    end
  end
end
