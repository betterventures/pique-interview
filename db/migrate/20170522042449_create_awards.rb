class CreateAwards < ActiveRecord::Migration[5.0]
  def change
    create_table :awards do |t|
      t.integer :amount, null: false
      t.references :scholarship

      t.timestamps
    end
  end
end
