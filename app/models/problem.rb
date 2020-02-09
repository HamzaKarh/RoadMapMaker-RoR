class Problem < ApplicationRecord
    belongs_to :project
    has_many :counteractions, dependent: :destroy
    validates :name, presence: true 
end
