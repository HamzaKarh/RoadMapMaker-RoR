class Problem < ApplicationRecord
    belongs_to :project
    has_many :actions, dependent: :destroy
    validates :name, presence: true 
end
