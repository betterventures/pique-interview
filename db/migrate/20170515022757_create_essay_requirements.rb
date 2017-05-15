class CreateEssayRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :essay_requirements do |t|
      t.text :prompt
      t.integer :word_limit
      t.references :scholarship, foreign_key: true
    end
  end
end
