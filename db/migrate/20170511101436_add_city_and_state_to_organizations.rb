class AddCityAndStateToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :city, :string
    add_column :organizations, :state, :string
  end
end
