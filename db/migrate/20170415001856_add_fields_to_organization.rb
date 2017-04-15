class AddFieldsToOrganization < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :phone, :string
    add_column :organizations, :address, :string
    add_column :organizations, :email, :string
    add_column :organizations, :website, :string
  end
end
