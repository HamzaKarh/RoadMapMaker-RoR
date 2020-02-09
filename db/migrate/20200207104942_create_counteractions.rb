class CreateCounteractions < ActiveRecord::Migration[6.0]
  def change
    create_table :counteractions do |t|
      t.string :name
      t.text :description
      t.references :project, foreign_key: true, null: true
      t.references :problem, foreign_key: true, null: true
    end
  end
end
