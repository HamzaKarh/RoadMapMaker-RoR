class AddProblemToProjects < ActiveRecord::Migration[6.0]
  def change
    add_reference :problems, :project, null: true, foreign_key: true
  end
end
