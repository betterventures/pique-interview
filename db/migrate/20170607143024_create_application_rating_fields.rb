class CreateApplicationRatingFields < ActiveRecord::Migration[5.0]
  def change
    create_table :application_rating_fields do |t|
      t.integer :score
      t.references :score_card_field, foreign_key: true
      t.references :application_rating, foreign_key: true
      t.timestamps
    end
  end
end
