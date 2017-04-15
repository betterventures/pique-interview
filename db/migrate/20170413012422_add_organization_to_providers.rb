class AddOrganizationToProviders < ActiveRecord::Migration[5.0]
  def change
    add_column :providers, :organization, :string
  end
end
