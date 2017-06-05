class CreateScoreCardFields < ActiveRecord::Migration[5.0]
  def change
    create_table :score_card_fields do |t|
      t.references :score_card, foreign_key: true
      t.string :title, null: false
      t.integer :possible_score, null: false
      t.timestamps
    end
  end
end
