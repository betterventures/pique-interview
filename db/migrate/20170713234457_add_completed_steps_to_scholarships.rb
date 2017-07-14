class AddCompletedStepsToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :completed_step_general, :boolean
    add_column :scholarships, :completed_step_essay, :boolean
    add_column :scholarships, :completed_step_audience, :boolean
    add_column :scholarships, :completed_step_application_questions, :boolean
    add_column :scholarships, :completed_step_supplemental, :boolean
  end
end
