class ApplicationController < ActionController::Base
  
    protected
  
    def after_sign_in_path_for(resource)
      '/projects'
    end
  
    def after_sign_out_path_for(resource)
      '/'
    end
  
  
  end