class CreateHonorsAndAwards < ActiveRecord::Migration[5.0]
  def change
    create_table :honor_or_awards do |t|
      t.integer :student_id, null: false
      t.string :title
      t.string :provider_name
      t.date :awarded_at
    end

    add_index :honor_or_awards, :student_id
  end
end
