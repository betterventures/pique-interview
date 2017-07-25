class AddScholarshipApplicationIdToAwards < ActiveRecord::Migration[5.0]
  def change
    add_reference :awards, :scholarship_application, foreign_key: true
  end
end
