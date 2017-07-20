class CreateUserToStudentRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :user_to_student_relationships do |t|
      t.belongs_to :student, index: true, null: false
      t.belongs_to :parent_or_guardian, index: true
      t.belongs_to :counselor, index: true
      t.integer :relationship_type, index: true
      t.timestamps
    end
  end
end
