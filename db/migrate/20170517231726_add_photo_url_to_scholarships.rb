class AddPhotoUrlToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :photo_url, :string
  end
end
