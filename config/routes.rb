Rails.application.routes.draw do
  devise_for :providers, controllers: {
    registrations: 'providers/registrations'
  }
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  get 'indiegogo/share', to: 'indiegogo#share'
end
