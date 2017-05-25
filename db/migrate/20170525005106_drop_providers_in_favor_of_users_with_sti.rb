class DropProvidersInFavorOfUsersWithSti < ActiveRecord::Migration[5.0]
  def change
    drop_table :providers
  end
end
