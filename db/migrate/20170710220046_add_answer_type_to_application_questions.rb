class AddAnswerTypeToApplicationQuestions < ActiveRecord::Migration[5.0]
  def change
    add_column :application_questions, :answer_type, :integer
  end
end
