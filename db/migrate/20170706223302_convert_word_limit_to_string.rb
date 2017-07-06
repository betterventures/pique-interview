class ConvertWordLimitToString < ActiveRecord::Migration[5.0]
  def up
    change_column :essay_requirements, :word_limit, :string
  end

  def down
    change_column :essay_requirements, :word_limit, :integer
  end
end
