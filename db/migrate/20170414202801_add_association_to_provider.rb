class AddAssociationToProvider < ActiveRecord::Migration[5.0]
  def change
    add_reference :providers, :organization, foreign_key: true
  end
end
