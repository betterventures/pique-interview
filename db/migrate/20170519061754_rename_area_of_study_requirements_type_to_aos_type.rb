class RenameAreaOfStudyRequirementsTypeToAosType < ActiveRecord::Migration[5.0]
  def change
    rename_column :area_of_study_requirements, :type, :aos_type
  end
end
