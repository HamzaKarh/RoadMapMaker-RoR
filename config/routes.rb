Rails.application.routes.draw do
  resources :actions
  devise_for :admins
  devise_for :user
  devise_scope :user do
    get '/user/sign_out(.:format)' => 'devise/sessions#destroy'
  end

  resources :projects do
    resources :problems, controller: 'projects/problems'
    
  end
  delete '/projects/:id' => 'projects#destroy'
  post '/projects/:id' => 'projects#show'
  post '/projects/:id/edit' => 'projects#edit'
  patch '/projects' => 'projects#update'  


  
  root 'projects#index'
  




  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
