class RemoveNumAwardsAndAwardAmountFromScholarships < ActiveRecord::Migration[5.0]
  def change
    remove_column :scholarships, :number_of_awards
    remove_column :scholarships, :award_amount
  end
end
