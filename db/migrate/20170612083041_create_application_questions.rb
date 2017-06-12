class CreateApplicationQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :application_questions do |t|
      t.references :scholarship, foreign_key: true
      t.text :prompt
      t.timestamps
    end
  end
end
