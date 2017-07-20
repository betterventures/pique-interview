class CreateSchools < ActiveRecord::Migration[5.0]
  def change
    create_table :schools do |t|
      t.string :name, null: false
      t.string :phone
      t.string :fax
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
    end
  end
end
