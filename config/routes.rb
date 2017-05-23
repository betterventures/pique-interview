Rails.application.routes.draw do
  # Provider flow
  devise_for :providers, controllers: {
    registrations: 'providers/registrations'
  }
  namespace :providers do
    resources :organizations, only: [:new, :create, :edit, :show]

    # nest payments under scholarships
    resources :scholarships, only: [:new, :create] do
      resources :payments, only: [:new, :create]
      resources :steps, only: [:show, :update], controller: 'scholarship_steps'
    end

    # user account info routes
    get 'account_info', to: 'account_info#edit'
    put 'account_info', to: 'account_info#update'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :provider do
    root 'providers/sessions#new'
  end

  get 'indiegogo/share', to: 'indiegogo#share'
end
