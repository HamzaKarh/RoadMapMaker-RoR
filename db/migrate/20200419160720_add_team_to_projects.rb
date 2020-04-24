class AddTeamToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :team, :text
    add_column :projects, :deliverable, :text
    add_column :projects, :budget, :string
    add_column :projects, :extworkforce, :text
  end
end
