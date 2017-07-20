class AddSchoolIdToStudents < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :school, foreign_key: true, index: true
  end
end
