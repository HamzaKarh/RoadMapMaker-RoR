Rails.application.routes.draw do
  resources :actions
  resources :problems
  devise_for :admins
  devise_for :users
  resources :projects
  get '/projects', controller:'projects', action:'index'
  get '/layout/index'



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
