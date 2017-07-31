class AddPiqueTagAttrsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :gender, :integer
    add_column :users, :major, :string
    add_column :users, :race, :integer
    add_column :users, :citizenship, :integer
    add_column :users, :degree_type, :integer
    add_column :users, :grad_year, :integer
  end
end
