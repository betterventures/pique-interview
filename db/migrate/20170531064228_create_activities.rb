class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.integer :student_id, null: false
      t.string :title, null: false
      t.string :position_held
      t.string :start_date
      t.string :end_date
      t.text :description
    end

    add_index :activities, :student_id
  end
end
