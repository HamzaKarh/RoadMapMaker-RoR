class AddProblemToActions < ActiveRecord::Migration[6.0]
  def change
    add_reference :actions, :problem, null: true, foreign_key: true
  end
end
