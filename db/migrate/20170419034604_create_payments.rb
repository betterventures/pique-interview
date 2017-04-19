class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :payments do |t|
      t.string :stripe_charge_id
      t.string :stripe_customer_id
      t.belongs_to :organization
      t.timestamps
    end
  end
end
