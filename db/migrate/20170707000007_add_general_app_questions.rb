class AddGeneralAppQuestions < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :app_ques_college, :boolean
    add_column :scholarships, :app_ques_birthplace, :boolean
    add_column :scholarships, :app_ques_parent_occupation, :boolean
    add_column :scholarships, :app_ques_accepted_college, :boolean
    add_column :scholarships, :app_ques_hs_ceremony_date, :boolean
  end
end
