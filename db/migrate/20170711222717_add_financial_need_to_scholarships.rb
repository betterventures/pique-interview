class AddFinancialNeedToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :for_financial_need, :boolean
  end
end
