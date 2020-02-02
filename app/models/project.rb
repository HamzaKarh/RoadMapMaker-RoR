class Project < ApplicationRecord
    belongs_to :user
    has_many :problems, dependent: :destroy
    has_many :actions, dependent: :destroy
end
