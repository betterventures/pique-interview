class RemoveEssayPrompts < ActiveRecord::Migration[5.0]
  def change
    drop_table :essay_prompts do |t|
      t.text "prompt"
      t.references "essay_requirement"
    end
  end
end
