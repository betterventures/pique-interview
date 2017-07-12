class CreateOrgProvidedDocuments < ActiveRecord::Migration[5.0]
  def change
    create_table :org_provided_documents do |t|
      t.references :scholarship, foreign_key: true
      t.string :title, null: false
      t.string :filepicker_url
      t.timestamps
    end
  end
end
