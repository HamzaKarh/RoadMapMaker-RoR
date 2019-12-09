Rails.application.routes.draw do
  resources :actions
  resources :problems
  devise_for :admins
  devise_for :user
  devise_scope :user do 
    get '/user/sign_out(.:format)' => 'devise/sessions#destroy'
  end
  resources :projects
  delete '/projects/:id' => 'projects#destroy'



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
