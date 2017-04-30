class AddFieldsToScholarship < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :number_of_awards, :integer
    add_column :scholarships, :minimum_age, :integer
    add_column :scholarships, :flexible_scores, :boolean
    add_column :scholarships, :eligibility, :text
    add_column :scholarships, :renewable, :boolean
    add_column :scholarships, :minimum_community_service, :integer
  end
end
