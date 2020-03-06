class Project < ApplicationRecord
    belongs_to :user
    has_many :problems, dependent: :destroy
    has_many :counteractions, dependent: :destroy
    has_many :wbs, dependent: :destroy


    accepts_nested_attributes_for :problems, :counteractions, :wbs
end
