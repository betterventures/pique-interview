class AddApplicantAttrsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :description, :text
    add_column :users, :tagline, :string
    add_column :users, :gpa, :float
  end
end
