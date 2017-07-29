class ChangeActivitiesDatesToDateTypes < ActiveRecord::Migration[5.0]
  def up
    remove_column :activities, :start_date
    add_column :activities, :start_date, :date
    remove_column :activities, :end_date
    add_column :activities, :end_date, :date
  end

  def down
    raise ActiveRecord::IrreversibleMigration.new 'Irreversible migration - data for all Activities will be lost!'
  end
end
