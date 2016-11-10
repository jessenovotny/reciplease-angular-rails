class CreateHealthLabels < ActiveRecord::Migration[5.0]
  def change
    create_table :health_labels do |t|
      t.string :label
      t.timestamps
    end
  end
end
