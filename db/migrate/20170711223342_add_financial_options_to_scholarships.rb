class AddFinancialOptionsToScholarships < ActiveRecord::Migration[5.0]
  def change
    add_column :scholarships, :financial_acceptable_fafsa, :boolean
    add_column :scholarships, :financial_acceptable_sar, :boolean
    add_column :scholarships, :financial_acceptable_tax, :boolean
    add_column :scholarships, :financial_acceptable_w2, :boolean
  end
end
