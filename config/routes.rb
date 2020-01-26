Rails.application.routes.draw do
  resources :actions
  devise_for :admins
  devise_for :user
  devise_scope :user do 
    resources :projects, only: [:index, :destroy, :edit, :update, :new]
    resources :problems, only: [:index, :destroy, :edit, :update, :new]
    get '/user/sign_out(.:format)' => 'devise/sessions#destroy'
  end

  resources :projects
  

  delete '/projects/:id' => 'projects#destroy'
  post '/projects/:id' => 'projects#show'
  post '/projects/:id/edit' => 'projects#edit'
  patch '/projects' => 'projects#update'

  resources :problems

  post '/problems/new' => 'problems#new'
  patch '/problems' => 'problems#update'

  

  




  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
