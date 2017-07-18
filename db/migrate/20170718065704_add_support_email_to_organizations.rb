class AddSupportEmailToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :support_email, :string
  end
end
