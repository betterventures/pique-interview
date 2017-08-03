class AddReviewerToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :reviewer, :boolean, default: false
  end
end
