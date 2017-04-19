class CreateScholarships < ActiveRecord::Migration[5.0]
  def change
    create_table :scholarships do |t|
      # Missing essay prompt, supplemental requirements, area of study
      # requirement, location limited

      t.string :title
      t.text :description
      t.integer :award_amount
      t.decimal :gpa
      t.integer :minimum_sat_score
      t.integer :minimum_act_score
      t.integer :minimum_recommendations
      t.boolean :generic_recommendation

      t.boolean :for_hs_freshman
      t.boolean :for_hs_sophomore
      t.boolean :for_hs_junior
      t.boolean :for_hs_senior

      t.boolean :for_us_citizen
      t.boolean :for_male
      t.boolean :for_female
      t.boolean :for_black_people
      t.boolean :for_white_people
      t.boolean :for_hispanic_people
      t.boolean :for_asian_people
      t.boolean :for_native_people

      t.decimal :maximum_family_income
      t.boolean :requires_community_service

      t.timestamps
    end
  end
end
