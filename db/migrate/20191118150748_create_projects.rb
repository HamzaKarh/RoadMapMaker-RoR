class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :client_company_name
      t.string :client_name
      t.text :description

      t.timestamps
    end
  end
end
