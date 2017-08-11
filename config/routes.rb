Rails.application.routes.draw do
  # Provider flow
  devise_for :providers, controllers: {
    registrations: 'providers/registrations',
    invitations: 'providers/invitations',
  }
  namespace :providers do
    resources :organizations, only: [:new, :create, :edit, :update, :show]

    # nest payments under scholarships
    resources :scholarships, only: [:new, :create] do
      resources :payments, only: [:new, :create]
      resources :steps, only: [:show, :update], controller: 'scholarship_steps'
    end

    # schol dash route
    # TODO: just put this all in scholarship#show
    get '/scholarships/:scholarship_id/', to: 'scholarship_dashboard#new', as: 'scholarship_dashboard'
    put '/scholarships/:scholarship_id/', to: 'scholarships#update_json', as: 'scholarship_update_json'

    # user account info routes
    get 'setup_account', to: 'account_info#initial'
    get 'account_info', to: 'account_info#edit'
    get 'account_password', to: 'account_info#edit'
    patch 'account_info', to: 'account_info#update'
    patch 'account_password', to: 'account_info#update_password'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :provider do
    root to: 'landing_pages#new'
  end

  get 'indiegogo/share', to: 'indiegogo#share'
end
