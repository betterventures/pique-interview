class CreateScoreCards < ActiveRecord::Migration[5.0]
  def change
    create_table :score_cards do |t|
      t.references :scholarship, foreign_key: true
      t.timestamps
    end
  end
end
