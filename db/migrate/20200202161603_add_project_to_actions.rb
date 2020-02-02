class AddProjectToActions < ActiveRecord::Migration[6.0]
  def change
    add_reference :actions, :project, null: true, foreign_key: true
  end
end
