class CreateEssayPrompts < ActiveRecord::Migration[5.0]
  def change
    create_table :essay_prompts do |t|
      t.text :prompt
      t.references :essay_requirement, foreign_key: true
    end
  end
end
