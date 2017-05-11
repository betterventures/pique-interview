class RemoveAddressAndEmailFromOrganizations < ActiveRecord::Migration[5.0]
  def change
    remove_column :organizations, :address, :string
    remove_column :organizations, :email, :string
  end
end
