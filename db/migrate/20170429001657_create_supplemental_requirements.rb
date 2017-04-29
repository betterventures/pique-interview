class CreateSupplementalRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :supplemental_requirements do |t|
      t.string :title
      t.belongs_to :scholarship, foreign_key: true

      t.timestamps
    end
  end
end
