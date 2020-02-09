class Project < ApplicationRecord
    belongs_to :user
    has_many :problems, dependent: :destroy
    has_many :counteractions, dependent: :destroy
end
