class AddGeneralSupplementalDocumentsToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :supp_doc_birth, :boolean
    add_column :scholarships, :supp_doc_acceptance, :boolean
    add_column :scholarships, :supp_doc_consent, :boolean
  end
end
