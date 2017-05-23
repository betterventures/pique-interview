class AddAccountAttributesToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :job_title, :string
    add_column :users, :employer_name, :string
    add_column :users, :photo_url, :string
  end
end
