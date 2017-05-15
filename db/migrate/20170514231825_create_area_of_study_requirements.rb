class CreateAreaOfStudyRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :area_of_study_requirements do |t|
      t.integer :type
      t.references :scholarship, foreign_key: true
    end
  end
end
