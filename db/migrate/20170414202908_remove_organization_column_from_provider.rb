class RemoveOrganizationColumnFromProvider < ActiveRecord::Migration[5.0]
  def change
    remove_column :providers, :organization, :string
  end
end
