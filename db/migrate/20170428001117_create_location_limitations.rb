class CreateLocationLimitations < ActiveRecord::Migration[5.0]
  def change
    create_table :location_limitations do |t|
      t.string :city
      t.string :state
      t.belongs_to :scholarship, foreign_key: true

      t.timestamps
    end
  end
end
