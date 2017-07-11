class AddNoteFromProviderToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :note_from_provider, :text
  end
end
